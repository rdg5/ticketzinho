"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("@practica/logger");
const error_handling_1 = require("@practica/error-handling");
const roleUseCase = __importStar(require("../../domain/role-use-case"));
function defineRoleRoutes(expressApp) {
    const router = express_1.default.Router();
    router.get('/', async (req, res, next) => {
        try {
            logger_1.logger.info(`Role API was called to get all roles from db`);
            const response = await roleUseCase.getRoles();
            if (!response) {
                res.status(404).end();
                return;
            }
            res.json(response);
        }
        catch (error) {
            next(error);
        }
    });
    router.get('/:roleId', async (req, res, next) => {
        const roleId = Number(req.params.roleId);
        try {
            logger_1.logger.info(`Role API was called to get one role with id ${req.params.roleId} from db`);
            if (Number.isNaN(roleId) || Number(roleId) < 1) {
                res.status(400).send({ error: 'roleId must be a valid number.' });
                return;
            }
            const response = await roleUseCase.getRoleById(roleId);
            if (!response) {
                res.status(404).json({ error: 'Role not found' }).end();
                return;
            }
            res.json(response);
        }
        catch (error) {
            next(error);
        }
    });
    router.post('/', async (req, res, next) => {
        try {
            logger_1.logger.info(`Role API was called to create a new role in the db`);
            const response = await roleUseCase.createNewRole(req.body);
            if (!response) {
                res.status(404).end();
                return;
            }
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof error_handling_1.AppError) {
                res.status(error.HTTPStatus).json({ error: error.message });
                next(error);
            }
        }
    });
    router.patch('/:roleId', async (req, res, next) => {
        const roleId = Number(req.params.roleId);
        try {
            logger_1.logger.info(`Role API was called to edit role with id ${req.params.roleId} from db`);
            if (Number.isNaN(roleId) || Number(roleId) < 1) {
                res.status(400).send({ error: 'roleId must be a valid number.' });
                return;
            }
            const response = await roleUseCase.editExistingRole(roleId, req.body);
            if (!response) {
                res.status(404).json({ error: 'Role not found' }).end();
                return;
            }
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof error_handling_1.AppError) {
                res.status(error.HTTPStatus).json({ error: error.message });
                next(error);
            }
        }
    });
    router.delete('/:roleId', async (req, res, next) => {
        const roleId = Number(req.params.roleId);
        try {
            logger_1.logger.info(`Role API was called to delete one role with id ${req.params.roleId} from db`);
            if (Number.isNaN(roleId) || Number(roleId) < 1) {
                res.status(400).send({ error: 'roleId must be a valid number.' });
                return;
            }
            const response = await roleUseCase.deleteRoleById(roleId);
            if (!response) {
                res.status(404).json({ error: 'Role not found' }).end();
                return;
            }
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    });
    expressApp.use('/api/roles', router);
}
exports.default = defineRoleRoutes;

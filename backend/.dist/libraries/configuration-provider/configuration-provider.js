"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.reset = exports.initializeAndValidate = void 0;
const convict_1 = __importDefault(require("convict"));
// TODO: we need to change any to generic and accept the schema type from the consumer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let convictConfigurationProvider;
function initializeAndValidate(schema) {
    convictConfigurationProvider = (0, convict_1.default)(schema);
    convictConfigurationProvider.validate();
}
exports.initializeAndValidate = initializeAndValidate;
// Meant mostly for testing purposes, to allow resetting the state between tests
function reset() {
    convictConfigurationProvider = undefined;
}
exports.reset = reset;
function getValue(keyName) {
    if (convictConfigurationProvider === undefined) {
        throw new Error('Configuration has not been initialized yet');
    }
    // TODO: we need to change any to generic and accept the schema type from the consumer
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return convictConfigurationProvider.get(keyName);
}
exports.getValue = getValue;

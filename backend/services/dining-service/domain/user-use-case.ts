import * as userRepository from '../data-access/user-repository';

export async function getUsers() {
  return await userRepository.getAllUsers();
}

export async function getUsersWithTeams() {
  return await userRepository.getAllUsersWithTeams();
}

export async function createNewUser(requestBody) {
  return await userRepository.saveNewUser(requestBody);
}
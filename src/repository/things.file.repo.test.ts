import { ThingsFileRepo } from './things.file.repo';
import fs from 'fs/promises';
jest.mock('fs/promises');

describe('Given ThingsFileRepo', () => {
  // Arrange
  const repo = new ThingsFileRepo();

  test('Then it could be instantiated', () => {
    expect(repo).toBeInstanceOf(ThingsFileRepo);
  });

  describe('When I use query', () => {
    test('Then should return the data', async () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      // Act
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When I use queryId', () => {
    test('Then it should return one item if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"1"}]');
      const id = '1';
      const result = await repo.queryId(id);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then it should... if it has a valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":"2"}]');
      const id = '1';

      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });

  describe('When I use create ', () => {
    test('Then it should return one new partial item ', async () => {
      const data = { name: 'fresa' };
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.create(data);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ name: 'fresa' });
    });
  });
  describe('When call update', () => {
    test('Then it should return the updated object if the id is found', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{ "name": "fresa"}]');
      const result = await repo.update({
        name: 'pera',
      });
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ name: 'pera' });
    });
    test('Then it should throw an error if the id isnt found', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"name":"pera"}]');
      expect(async () =>
        repo.update({
          name: 'pera',
        })
      ).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When I use delete method', () => {
    test('Then it should delete the thing', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      const result = await repo.destroy('1');
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
    test('Then it should throw an error if it has a NO valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{ "id": "1", "name": "test", "week": 3, "level": 2 }]'
      );
      expect(async () => repo.destroy('2')).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
});

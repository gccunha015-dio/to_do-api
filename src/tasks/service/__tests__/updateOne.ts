import { TasksService, InvalidDataError } from '.';

const updateOne = () =>
	describe('updateOne method', () => {
		it('should update the Task', async () => {
			const taskToUpdate = (
				await TasksService.create([
					{
						description: 'Task',
					},
				])
			)[0];
			await TasksService.updateOne({
				...taskToUpdate,
				description: 'Updated',
				isDone: true,
			});
			const tasks = await TasksService.readByIds([taskToUpdate.id]);
			expect(tasks[0]).toMatchObject({
				...taskToUpdate,
				description: 'Updated',
				isDone: true,
			});
		});
		it('should throw InvalidDataError', async () => {
			const fakeTask = { id: 150, description: 'Test', isDone: true };
			await expect(TasksService.updateOne(fakeTask)).rejects.toThrowError(
				InvalidDataError
			);
		});
	});

export default updateOne;

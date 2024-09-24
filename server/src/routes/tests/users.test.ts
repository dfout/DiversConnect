import request from 'supertest';
import express from 'express';
import userRoutes from '../users'; // Adjust the path as necessary
import User from '../../models/User'; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

jest.mock('../../models/User'); // Mock the User model

describe('User API', () => {
  const mockUser = {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /users - should create a new user', async () => {
    (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).post('/users').send(mockUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it('GET /users - should retrieve all users', async () => {
    (User.find as jest.Mock).mockResolvedValue([mockUser]);

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  it('GET /users/:id - should retrieve a user by ID', async () => {
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('GET /users/:id - should return 404 if user not found', async () => {
    (User.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/users/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('PUT /users/:id - should update a user by ID', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).put('/users/1').send(mockUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('PUT /users/:id - should return 404 if user not found for update', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/users/999').send(mockUser);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('DELETE /users/:id - should delete a user by ID', async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).delete('/users/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('DELETE /users/:id - should return 404 if user not found for deletion', async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/users/999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});

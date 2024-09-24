import request from 'supertest';
import express from 'express';
import postRoutes from "../posts"; // Adjust the path as necessary
import Post from '../../models/Post'; // Adjust the path as necessary
import User from '../../models/User'; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/posts', postRoutes); // Use the routes

// Mock the Post and User models
jest.mock('../../models/Post');
jest.mock('../../models/User');

describe('Post API', () => {
    const mockPost = {
        _id: '1',
        author: 'authorId1',
        title: 'Sample Post',
        description: 'This is a sample post description.',
        images: ['image1.jpg'],
        comments: [],
        likes: [],
        // posted_at: new Date(),
        location: 'Sample Location',
        dive: null,
    };

    const mockAuthor = {
        _id: 'authorId1',
        username: 'sampleuser',
        email: 'user@example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /posts - should create a new post', async () => {
        (User.findById as jest.Mock).mockResolvedValue(mockAuthor);
        (Post.prototype.save as jest.Mock).mockResolvedValue(mockPost);

        const response = await request(app).post('/posts').send(mockPost);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockPost);
    });

    it('POST /posts - should return 404 for invalid author', async () => {
        (User.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/posts').send(mockPost);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Author not found');
    });

    it('GET /posts - should retrieve all posts', async () => {
        (Post.find as jest.Mock).mockResolvedValue([mockPost]);

        const response = await request(app).get('/posts');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockPost]);
    });

    it('GET /posts/:id - should retrieve a post by ID', async () => {
        (Post.findById as jest.Mock).mockResolvedValue(mockPost);

        const response = await request(app).get('/posts/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPost);
    });

    it('GET /posts/:id - should return 404 if post not found', async () => {
        (Post.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/posts/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Post not found');
    });

    it('PUT /posts/:id - should update a post by ID', async () => {
        (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost);

        const response = await request(app).put('/posts/1').send(mockPost);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPost);
    });

    it('PUT /posts/:id - should return 404 if post not found for update', async () => {
        (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        const response = await request(app).put('/posts/999').send(mockPost);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Post not found');
    });

    it('DELETE /posts/:id - should delete a post by ID', async () => {
        (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPost);

        const response = await request(app).delete('/posts/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Post deleted successfully');
    });

    it('DELETE /posts/:id - should return 404 if post not found for deletion', async () => {
        (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        const response = await request(app).delete('/posts/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Post not found');
    });
});

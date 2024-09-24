import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Dive from '../../models/Dive';
import DiveSite from '../../models/DiveSite';
import User from '../../models/User';
import diveRoutes from '../dives'; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/dives', diveRoutes); // Use the routes

// Mock the Dive and DiveSite models
jest.mock('../../models/Dive');
jest.mock('../../models/DiveSite');

describe('Dive API', () => {
    const mockDive = {
        _id: '1',
        participants: ['userId1'],
        dive_site: 'diveSiteId1',
        dive_date: new Date(),
        depth: 30,
        time_underwater: 60,
        notes: 'First dive',
    };

    const mockDiveSite = {
        _id: 'diveSiteId1',
        name: 'Great Reef',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /dives - should create a new dive', async () => {
        (DiveSite.findById as jest.Mock).mockResolvedValue(mockDiveSite);
        (Dive.prototype.save as jest.Mock).mockResolvedValue(mockDive);

        const response = await request(app).post('/dives').send(mockDive);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockDive);
    });

    it('POST /dives - should return 404 for invalid dive site', async () => {
        (DiveSite.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/dives').send(mockDive);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Dive site not found');
    });

    it('GET /dives - should retrieve all dives', async () => {
        (Dive.find as jest.Mock).mockResolvedValue([mockDive]);

        const response = await request(app).get('/dives');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockDive]);
    });

    it('GET /dives/:id - should retrieve a dive by ID', async () => {
        (Dive.findById as jest.Mock).mockResolvedValue(mockDive);

        const response = await request(app).get('/dives/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDive);
    });

    it('GET /dives/:id - should return 404 if dive not found', async () => {
        (Dive.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/dives/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Dive not found');
    });

    it('PUT /dives/:id - should update a dive by ID', async () => {
        (Dive.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockDive);

        const response = await request(app).put('/dives/1').send(mockDive);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDive);
    });

    it('PUT /dives/:id - should return 404 if dive not found for update', async () => {
        (Dive.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        const response = await request(app).put('/dives/999').send(mockDive);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Dive not found');
    });

    it('DELETE /dives/:id - should delete a dive by ID', async () => {
        (Dive.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDive);

        const response = await request(app).delete('/dives/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Dive deleted successfully');
    });

    it('DELETE /dives/:id - should return 404 if dive not found for deletion', async () => {
        (Dive.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        const response = await request(app).delete('/dives/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Dive not found');
    });
});
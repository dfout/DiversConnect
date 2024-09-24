import request from 'supertest';
import express from 'express';
import eventRoutes from "../events"
import Event from '../../models/Event';

const app = express();
app.use(express.json());
app.use('/events', eventRoutes); // Use the routes

// Mock the Event model
jest.mock('../../models/Event');

describe('Event API', () => {
    const mockEvent = {
        _id: '1',
        event_type: 'event',
        participants_needed: 5,
        location: 'Location 1',
        date_time: new Date(),
        description: 'Description 1',
        requirements: 'Requirements 1',
        gear: 'Gear 1',
        skill_level: 'Beginner',
        safety_rating: 5,
        min_dive_hours: 10,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /events - should create a new event', async () => {
        (Event.prototype.save as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).post('/events').send(mockEvent);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockEvent);
    });

    it('POST /events - should return 400 for invalid event_type', async () => {
        const invalidEvent = { ...mockEvent, event_type: 'invalid' };
        const response = await request(app).post('/events').send(invalidEvent);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid event_type');
    });

    it('GET /events - should retrieve all events', async () => {
        (Event.find as jest.Mock).mockResolvedValue([mockEvent]);

        const response = await request(app).get('/events');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockEvent]);
    });

    it('GET /events/:id - should retrieve an event by ID', async () => {
        (Event.findById as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).get('/events/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvent);
    });

    it('GET /events/:id - should return 404 if event not found', async () => {
        (Event.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/events/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Event not found');
    });

    it('PUT /events/:id - should update an event by ID', async () => {
        (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).put('/events/1').send(mockEvent);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvent);
    });

    it('PUT /events/:id - should return 404 if event not found for update', async () => {
        (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        const response = await request(app).put('/events/999').send(mockEvent);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Event not found');
    });

    it('DELETE /events/:id - should delete an event by ID', async () => {
        (Event.findByIdAndDelete as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).delete('/events/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Event deleted successfully');
    });

    it('DELETE /events/:id - should return 404 if event not found for deletion', async () => {
        (Event.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        const response = await request(app).delete('/events/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Event not found');
    });
});

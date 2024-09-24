import request from 'supertest';
import express from 'express';
import diveSiteRoutes from '../diveSites'; // Adjust the path as necessary
import DiveSite from '../../models/DiveSite'; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/diveSites', diveSiteRoutes);

jest.mock('../../models/DiveSite'); // Mock the DiveSite model

describe('DiveSite API', () => {
  const mockDiveSite = {
    _id: '1',
    name: 'Coral Reef',
    location: {
      country: 'Australia',
      region: 'Queensland',
      coordinates: {
        lat: -16.1234,
        lng: 145.6789,
      },
    },
    depth_range: {
      min_depth: 5,
      max_depth: 30,
    },
    difficulty_level: 'Intermediate',
    description: 'Beautiful coral reef with diverse marine life.',
    marine_life: ['Corals', 'Fish', 'Turtles'],
    safety_rating: 4,
    dive_conditions: {
      visibility: 'Good',
      current: 'Mild',
    },
    created_at: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /diveSites - should create a new dive site', async () => {
    (DiveSite.prototype.save as jest.Mock).mockResolvedValue(mockDiveSite);

    const response = await request(app).post('/diveSites').send(mockDiveSite);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockDiveSite);
  });

  it('GET /diveSites - should retrieve all dive sites', async () => {
    (DiveSite.find as jest.Mock).mockResolvedValue([mockDiveSite]);

    const response = await request(app).get('/diveSites');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockDiveSite]);
  });

  it('GET /diveSites/:id - should retrieve a dive site by ID', async () => {
    (DiveSite.findById as jest.Mock).mockResolvedValue(mockDiveSite);

    const response = await request(app).get('/diveSites/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDiveSite);
  });

  it('GET /diveSites/:id - should return 404 if dive site not found', async () => {
    (DiveSite.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/diveSites/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Dive site not found');
  });

  it('PUT /diveSites/:id - should update a dive site by ID', async () => {
    (DiveSite.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockDiveSite);

    const response = await request(app).put('/diveSites/1').send(mockDiveSite);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDiveSite);
  });

  it('PUT /diveSites/:id - should return 404 if dive site not found for update', async () => {
    (DiveSite.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/diveSites/999').send(mockDiveSite);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Dive site not found');
  });

  it('DELETE /diveSites/:id - should delete a dive site by ID', async () => {
    (DiveSite.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDiveSite);

    const response = await request(app).delete('/diveSites/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dive site deleted successfully');
  });

  it('DELETE /diveSites/:id - should return 404 if dive site not found for deletion', async () => {
    (DiveSite.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete('/diveSites/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Dive site not found');
  });
});

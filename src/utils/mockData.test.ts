import { generateMockHistorical, mockSummary } from './mockData';

describe('mockSummary', () => {
  it('has correct shape', () => {
    expect(mockSummary).toMatchObject({
      city: expect.any(String),
      country: expect.any(String),
      temperature: expect.any(Number),
      humidity: expect.any(Number),
      windSpeed: expect.any(Number),
      pressure: expect.any(Number),
    });
  });
});

describe('generateMockHistorical', () => {
  it('generates correct number of entries for 1 day', () => {
    const data = generateMockHistorical(1);
    expect(data).toHaveLength(24);
  });

  it('generates correct number of entries for 7 days', () => {
    const data = generateMockHistorical(7);
    expect(data).toHaveLength(7);
  });

  it('generates correct number of entries for 30 days', () => {
    const data = generateMockHistorical(30);
    expect(data).toHaveLength(30);
  });

  it('each entry has valid shape', () => {
    const data = generateMockHistorical(7);
    data.forEach((entry) => {
      expect(entry).toMatchObject({
        dt: expect.any(Number),
        temp: expect.any(Number),
        humidity: expect.any(Number),
        windSpeed: expect.any(Number),
        pressure: expect.any(Number),
        pop: expect.any(Number),
      });
      expect(entry.pop).toBeGreaterThanOrEqual(0);
      expect(entry.pop).toBeLessThanOrEqual(1);
    });
  });
});
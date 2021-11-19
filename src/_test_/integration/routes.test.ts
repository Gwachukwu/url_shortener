import app from "../../app";
import { Url } from "../../models/url";
import supertest from "supertest";
const request = supertest(app);

afterAll(async () => {
  await Url.deleteMany({});
});

describe("GET /", () => {
  it("Should return welcome message", async () => {
    const response = await request.get("/api");

    expect(response.status).toBe(200);
    expect(response.body).toBe("Welcome to Url shortener api");
  });
});

describe("GET /wrongShortUrl", () => {
  it("Should return 404 if short url doesn't exist", async () => {
    const response = await request.get("/wrongShortUrl");

    expect(response.status).toBe(404);
    expect(response.body).toBe("Url Not Found");
  });
});

describe("POST /api/url/shorten", () => {
  it("Return error if no url is submitted", async () => {
    const response = await request.post("/api/url/shorten");

    expect(response.status).toBe(400);
    expect(response.body).toBe("longUrl is required");
  });

  it("Should fail when longUrl is invalid", async () => {
    const response = await request.post("/api/url/shorten").send({
      longUrl: "https/wrongurl",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Invalid longUrl");
  });

  it("Should create a short url", async () => {
    const response = await request.post("/api/url/shorten").send({
      longUrl: "https://github.com/gwachukwu",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "longUrl",
      "https://github.com/gwachukwu"
    );
    expect(response.body).toHaveProperty("urlCode");
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body).toHaveProperty("date");
  });
});

describe("DELETE /:code", () => {
  it("Should return error if url does not exist", async () => {
    const response = await request.delete("/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toBe("Url Not Found");
  });

  it("Should successfully delete shortUrl after creation", async () => {
    const createdUrlResponse = await request.post("/api/url/shorten").send({
      longUrl: "https://gwachukwu.netlify.app",
    });
    const deleteResponse = await request.delete(
      `/${createdUrlResponse.body.urlCode}`
    );

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toBe("Short url deleted successfully");
  });
});

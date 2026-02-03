import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import historyRoutes from "./routes/history.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import mangaRoutes from "./routes/manga.routes.js";
import genreRoutes from "./routes/genre.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

const app = express();
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow all origins for dev
            callback(null, true);
        },
        credentials: true,
    })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mangas", mangaRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/favorites", favoriteRoutes);

export default app;

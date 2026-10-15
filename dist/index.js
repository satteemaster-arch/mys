"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Connection string comes from the environment so the DB password never lands in Git or the Docker image
const mongoUri = process.env.MONGO_URI;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// src/public works both from ts-node (src/) and from the compiled build (dist/)
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'src', 'public')));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Routes
app.use('/api', UserRoutes_1.default);
if (!mongoUri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
}
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

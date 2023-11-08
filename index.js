const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).send({ message: "Invalid JSON payload" });
    }
    next();
});

app.get("/api", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url || url.trim() === "") {
            return res.status(400).send({ message: "URL is required" });
        }

        if (!ytdl.validateURL(url)) {
            throw new Error("Invalid video URL");
        }

        const info = await ytdl.getInfo(url);

        const data = {
            title: info.videoDetails.title,
            description: info.videoDetails.description,
            video_url: info.videoDetails.video_url,
            viewCount: info.videoDetails.viewCount,
            channel: {
                name: info.videoDetails.ownerChannelName,
                url: info.videoDetails.ownerProfileUrl,
            },
            publishDate: info.videoDetails.publishDate,
            updateDate: info.videoDetails.uploadDate,
            embed: info.videoDetails.embed,
            thumbnails: info.videoDetails.thumbnails.reverse(),
            formats: info.formats
                .filter((format) => format.audioBitrate)
                .map((format) => ({
                    url: format.url,
                    quality: format.qualityLabel,
                    mimeType: format.mimeType,
                    bitrate: format.bitrate,
                    contentLength: format.contentLength,
                    format: "",
                    codecs: format.codecs,
                    type: "",
                })),
                allFormats: info.formats
                .map((format) => ({
                    url: format.url,
                    quality: format.qualityLabel,
                    mimeType: format.mimeType,
                    bitrate: format.bitrate,
                    contentLength: format.contentLength,
                    format: "",
                    codecs: format.codecs,
                    type: "",
                })),
            };
    
            data.allFormats.forEach((format) => {
                if (format.mimeType.includes("video/mp4")) {
                    format.type = "video";
                    format.format = "mp4";
                } else if (format.mimeType.includes("video/webm")) {
                    format.type = "video";
                    format.format = "webm";
                } else if (format.mimeType.includes("audio/mp4")) {
                    format.type = "audio";
                    format.format = "mp4a";
                } else if (format.mimeType.includes("audio/webm")) {
                    format.type = "audio";
                    format.format = "webma";
                } else {
                    format.type = "unknown";
                    format.format = "unknown";
                }
            });

        data.formats.forEach((format) => {
            if (format.mimeType.includes("video/mp4")) {
                format.type = "video";
                format.format = "mp4";
            } else if (format.mimeType.includes("video/webm")) {
                format.type = "video";
                format.format = "webm";
            } else if (format.mimeType.includes("audio/mp4")) {
                format.type = "audio";
                format.format = "mp4a";
            } else if (format.mimeType.includes("audio/webm")) {
                format.type = "audio";
                format.format = "webma";
            } else {
                format.type = "unknown";
                format.format = "unknown";
            }
        });

        data.formats.sort((a, b) => {
            if (a.type < b.type) return 1;
            if (a.type > b.type) return -1;

            if (a.type === "video") {
                if (a.quality < b.quality) return 1;
                if (a.quality > b.quality) return -1;
            }

            return 0;
        });

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.send(JSON.stringify(data, null, 2));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post("/api", async (req, res) => {
    try {
        const url = req.body.url;
        if (!url || url.trim() === "") {
            return res.status(400).send({ message: "URL is required" });
        }

        if (!ytdl.validateURL(url)) {
            throw new Error("Invalid video URL");
        }

        const info = await ytdl.getInfo(url);

        const data = {
            title: info.videoDetails.title,
            description: info.videoDetails.description,
            video_url: info.videoDetails.video_url,
            viewCount: info.videoDetails.viewCount,
            channel: {
                name: info.videoDetails.ownerChannelName,
                url: info.videoDetails.ownerProfileUrl,
            },
            publishDate: info.videoDetails.publishDate,
            updateDate: info.videoDetails.uploadDate,
            embed: info.videoDetails.embed,
            thumbnails: info.videoDetails.thumbnails.reverse(),
            formats: info.formats
                .filter((format) => format.audioBitrate)
                .map((format) => ({
                    url: format.url,
                    quality: format.qualityLabel,
                    mimeType: format.mimeType,
                    bitrate: format.bitrate,
                    contentLength: format.contentLength,
                    format: "",
                    codecs: format.codecs,
                    type: "",
                })),
            allFormats: info.formats
            .map((format) => ({
                url: format.url,
                quality: format.qualityLabel,
                mimeType: format.mimeType,
                bitrate: format.bitrate,
                contentLength: format.contentLength,
                format: "",
                codecs: format.codecs,
                type: "",
            })),
        };

        data.allFormats.forEach((format) => {
            if (format.mimeType.includes("video/mp4")) {
                format.type = "video";
                format.format = "mp4";
            } else if (format.mimeType.includes("video/webm")) {
                format.type = "video";
                format.format = "webm";
            } else if (format.mimeType.includes("audio/mp4")) {
                format.type = "audio";
                format.format = "mp4a";
            } else if (format.mimeType.includes("audio/webm")) {
                format.type = "audio";
                format.format = "webma";
            } else {
                format.type = "unknown";
                format.format = "unknown";
            }
        });

        data.formats.forEach((format) => {
            if (format.mimeType.includes("video/mp4")) {
                format.type = "video";
                format.format = "mp4";
            } else if (format.mimeType.includes("video/webm")) {
                format.type = "video";
                format.format = "webm";
            } else if (format.mimeType.includes("audio/mp4")) {
                format.type = "audio";
                format.format = "mp4a";
            } else if (format.mimeType.includes("audio/webm")) {
                format.type = "audio";
                format.format = "webma";
            } else {
                format.type = "unknown";
                format.format = "unknown";
            }
        });

        data.formats.sort((a, b) => {
            if (a.type < b.type) return 1;
            if (a.type > b.type) return -1;

            if (a.type === "video") {
                if (a.quality < b.quality) return 1;
                if (a.quality > b.quality) return -1;
            }

            return 0;
        });

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.send(JSON.stringify(data, null, 2));
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

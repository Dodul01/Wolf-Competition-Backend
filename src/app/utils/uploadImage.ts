import path from "path";
import fs from 'fs';
import multer from 'multer';
import config from "../../config";

// base upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Subdirectories for diffrent file types 
const PROFILE_PICTURE_DIR = path.join(UPLOAD_DIR, "profilePicture");
const RAFFLE_THUMBNAIL_DIR = path.join(UPLOAD_DIR, "rafflesThumbnails");


// ensure the uploads dir exists
[UPLOAD_DIR, PROFILE_PICTURE_DIR, RAFFLE_THUMBNAIL_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// storage configuration for profile picture
const profileStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, PROFILE_PICTURE_DIR)
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `profile-${uniqueSuffix}${ext}`);
    }
});

const raffleStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, RAFFLE_THUMBNAIL_DIR);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `raffle-${uniqueSuffix}${ext}`);
    }
})


export const uploadProfile = multer({
    storage: profileStorage,
    limits: { fileSize: 20 * 1024 * 1024 } // 20 MB limit
});

export const uploadRaffle = multer({
    storage: raffleStorage,
    limits: { fileSize: 30 * 1024 * 1024 } // 30 MB limit
})

// const storage = multer.diskStorage({
//     destination(req, file, cd) {
//         cd(null, UPLOAD_DIR);
//     },
//     filename: (_req, file, cd) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         cd(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//     }
// });



export const upload = multer({ storage: profileStorage });

// helper function to get url 
export const getProfileImageURL = (fileName: string): string => {
    return `http://localhost:${config.port}/uploads/profilePicture/${fileName}`
}

export const getRaffleThumbnailURL = (fileName: string): string => {
    return `http://localhost:${config.port}/uploads/rafflesThumbnails/${fileName}`
}

export const getLocalImageURL = (filename: string): string => {
    return `http://localhost:${config.port}/uploads/${filename}`
};
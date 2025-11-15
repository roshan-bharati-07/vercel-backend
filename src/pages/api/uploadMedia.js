import nc from 'next-connect';
import { upload } from '../../middleware/multer.middleware.js';
import { uploadMedia } from '../../controller/uploadmedia.controller.js';


const handler = nc({
  onError(err, req, res) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: 'Not found' });
  },
});

handler.use(upload.array('files'));

handler.post(uploadMedia);

export const config = {
  api: { bodyParser: false },
};

export default handler;

import CONFIG from '@/utils/config/AppConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const postionTop = 'top-center';

const notify = (message) => {
  toast.info(message, {
    autoClose: CONFIG.TOAST_DURATION,
    position: postionTop,
    draggable: false,
    pauseOnFocusLoss: true,
    hideProgressBar: true,
    closeButton: false,
  });
};

const warn = (message) => {
  toast.warn(message, {
    autoClose: false,
    position: postionTop,
    draggable: false,
    pauseOnFocusLoss: true,
    hideProgressBar: true,
  });
};

export default {
  notify,
  warn,
};

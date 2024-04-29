import { atom, useRecoilState } from "recoil";

const Alert = React.forwardRef((props, ref) => {
    return (
      <MuiAlert {...props} ref={ref} variant='filled'/>
    );
  });

const noticeSnackbarAtom = atom({
    key: "app/noticeSnackbarAtom",
    default: {
      opened: false,
      autoHideDuration: 0,
      severity: "",
      msg: ""
    }
  });

function useNoticeSnackbarState() {
    const [noticeSnackbar, setNoticeSnackbar] = useRecoilState(noticeSnackbarAtom);
  
    const opened = noticeSnackbar.opened;
    const autoHideDuration = noticeSnackbar.autoHideDuration;
    const severity = noticeSnackbar.severity;
    const msg = noticeSnackbar.msg;
  
    const open = (msg, severity = "success", autoHideDuration = 6000) => {
      setNoticeSnackbar({
        opened: true,
        autoHideDuration,
        severity,
        msg
      });
    }
  
    const close = () => {
      setNoticeSnackbar({...noticeSnackbar, opened: false});
    }
  
    return {
      opened,
      open,
      close,
      autoHideDuration,
      severity,
      msg
    };
  }

  export default function NoticeSnackbar() {
    const state = useNoticeSnackbarState();
  
    return(
      <>
        <Snackbar
          open={state.opened}
          autoHideDuration={state.autoHideDuration}
          onClose={state.close}
        >
          <Alert severity={state.severity}>{state.msg}</Alert>
        </Snackbar>
      </>
    );
  }
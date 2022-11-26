import AppTitle from '../components/Title.js'
import LogIn from '../components/Login.js'
import {useChat} from './hooks/useChat.js'

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus, SignInNewUser } = useChat();
    const handleLogin = (name) => {
    if (!name){
        displayStatus({
            type: "error",
            msg: "Missing user name",
        });
    } else {
        SignInNewUser(name)
        setSignedIn(true);
    }
    }
    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
    
            // ✅ Use Popup instead of Redirect
            const result = await signInWithPopup(auth, provider);
    
            // ✅ Successfully signed in
            const user = result.user;
            console.log("✅ Google Sign-In Successful:", user);
    
            // Store user data in Redux
            dispatch(signInSuccess({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }));
    
            // Navigate to home page after successful login
            navigate('/');
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };
    

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    // ✅ Successfully signed in
                    const user = result.user;
                    console.log("✅ Google Sign-In Successful:", user);

                    // Store user data in Redux
                    dispatch(signInSuccess({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    }));

                    // Navigate to home page after successful login
                    navigate('/');
                }
            } catch (error) {
                console.error("Google Redirect Error:", error);
            }
        };

        handleRedirectResult();
    }, [auth, dispatch, navigate]);

    return (
        <>
        </>
        // <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        //     {/* <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        //     Continue with Google */}
        // </Button>
    );
}

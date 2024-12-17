import auth from '@react-native-firebase/auth';

export const signUp = async (email, password, name, surname) => {
  try {
    // Create user with email and password
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    
    // Update user profile with name and surname
    await userCredential.user.updateProfile({
      displayName: `${name} ${surname}`,
    });

    // Send verification email
    await userCredential.user.sendEmailVerification();

    return { 
      success: true, 
      user: userCredential.user,
      message: 'Doğrulama e-postası gönderildi. Lütfen e-postanızı kontrol edin.'
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkEmailVerification = async () => {
  try {
    await auth().currentUser.reload();
    return { 
      success: true, 
      isVerified: auth().currentUser.emailVerified 
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const resendVerificationEmail = async () => {
  try {
    await auth().currentUser.sendEmailVerification();
    return { 
      success: true, 
      message: 'Doğrulama e-postası tekrar gönderildi.' 
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

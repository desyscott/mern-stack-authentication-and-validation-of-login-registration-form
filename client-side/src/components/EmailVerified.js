import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function EmailVerified() {
  const [validUrl, setValidUrl] = useState(false);
  const [busy, setBusy] = useState(true);
  const params = useParams();

  const verifyEmail = async () => {
    try {
      const { data } = await axios.get(
        `/auth/email-verification/${params.userId}/${params.uniqueString}`
      );
      setBusy(false);
      console.log(data);
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        console.log(data.error);
        if (!data.success) {
          setBusy(false);
          setValidUrl(true);
          setValidUrl(data.error);
        }
      }
      console.log(error);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (busy) {
    return (
      <div>
        <h3>wait a moment verifying email</h3>
      </div>
    );
  }
  if (validUrl) {
    return (
      <div>
        <h1>{validUrl}</h1>
      </div>
    );
  }

  return (
    <div>
      <p>successfully verified your email you can login</p>
      <Link to="/login">login</Link>
    </div>
  );
}

export default EmailVerified;

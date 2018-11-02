
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/js/sw/sw.js')
      .then(registration=> {
          console.log("Registered successfully: ", registration.scope);
      })
      .catch(err=> {
          console.log("Registration failed: ", err);
      }
      );
  }

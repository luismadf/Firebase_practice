class Autenticacion {
  autEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          $("#avatar").attr("src", "imagenes/usuario_auth.png");
          Materialize.toast(`Bienvenido ${res.user.displayName}`, 5000);
        } else {
          firebase.auth().signOut();
          Materialize.toast(
            `Por favor realiza la verificacion de la cuenta`,
            5000
          );
        }
      });
    $(".modal").modal("close");
  }

  crearCuentaEmailPass(email, password, nombres) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: nombres,
        });

        const configuracion = {
          url: "htpp://localhost:3000",
        };

        result.user.sendEmailVerification().catch((error) => {
          console.error(error);
          Materialize.toast(error.message, 4000);
        });

        firebase.auth().signOut();

        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        );
        $(".modal").modal("close");
      })
      .catch((error) => {
        console.error(error);
        Materialize.toast(error.message, 4000);
      });
  }

  authCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        $("#avatar").attr("src", res.user.photoURL);
        $(".modal").modal("close");
        Materialize.toast(`Bienvenido ${res.user.displayName} !! `, 4000);
      })
      .catch((err) => {
        console.error(err);
        Materialize.toast(`Error al autenticarse con Google: ${err} !! `, 4000);
      });
  }

  authCuentaFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        $("#avatar").attr("src", res.user.photoURL);
        $(".modal").modal("close");
        Materialize.toast(`Bienvenido ${res.user.displayName} !! `, 4000);
      })
      .catch((err) => {
        console.error(err);
        Materialize.toast(
          `Error al autenticarse con Facebook: ${err} !! `,
          4000
        );
      });
  }

  authTwitter() {
    // TODO: Crear auth con twitter
  }
}



// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyALf_82T64kI-xeg0NFdxbI5WyF8Q6IsF0",
    authDomain: "boda-karim-y-martin.firebaseapp.com",
    projectId: "boda-karim-y-martin",
    storageBucket: "boda-karim-y-martin.appspot.com",
    messagingSenderId: "253538325835",
    appId: "1:253538325835:web:a5fd30f0be75fded66c4ce"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

let lista = document.getElementById('lista')


function sacarLoader(){
    let loader = document.getElementById('load')
    loader.classList.add('sacarLoader')

    let aIdeas = document.getElementById('aIdeas')
    aIdeas.classList.remove('noLook')
}

db.collection("regalos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

        sacarLoader()

        function SeleccionarRegalos () {
            let p = document.createElement('p')
            p.classList.add('pRegalos')
            p.textContent=`${doc.data().nombre}`

            let button = document.createElement('button')
            button.textContent=`Seleccionar`
            button.classList.add('btnSeleccionar')
        
            button.onclick=()=>{

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: true
                });
                swalWithBootstrapButtons.fire({
                    title: "ATENCIÓN",
                    text: `Si seleccionas la opción 'ACEPTAR' el regalo (${doc.data().nombre}) se va a eliminar de la lista, estás seguro de continuar?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Regalo seleccionado!",
                        text: "Si te equivocaste o cambias de opinión por favor no te olvides de enviarnos un WhatsApp, para poner el regalo nuevamente en la lista, ¡Gracias!",
                        icon: "success"
                    });
                    var regalo = db.collection("regalos").doc(`${doc.data().nombre.toLowerCase()}`);

                    // // //ACTUALIZARRRRR
                    return regalo.update({
                        reservado: true
                    })
                    .then(() => {
                    console.log("CLARO REY");
                    location.reload();
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("ACA HAY ALGO QUE NO VA ", error);
                    });
                    } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                    ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado!",
                        text: "Gracias por cancelar, el regalo permanecerá en la lista (: ",
                        icon: "error"
                    });
                    }
            });
        }
        
        p.appendChild(button)
        lista.appendChild(p)
    
    }


        doc.data().reservado!==true?
            SeleccionarRegalos()
        :
            console.log('MEEEESI')
        
    });
});

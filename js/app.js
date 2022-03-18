const url = 'http://localhost/login/usuarios/save';
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        error:'',
        success: '',
        show:true,
        user:{
            name:'',
            email:'',
            password:'',
            confirm_password:'',
        }
    },
    methods: {
        validar: function () {
            
            if (!this.user.email) {
                this.error = 'El correo electrónico es obligatorio.';
            } 
            else if (!this.validEmail(this.user.email)) {
                this.error = 'El correo electrónico debe ser válido.';
            }
            else if (!this.user.password) {
                this.error = "La contraseña es obligatoria.";
            }
            else if (this.user.password != this.user.confirm_password) {
                this.error = "La contraseña de cofirmación no coincide.";
            }
            else{
            
                let formData = new FormData();
                formData.append('name',this.user.name);
                formData.append('email',this.user.email);
                formData.append('password', this.user.password);
                formData.append('confirm_password', this.user.confirm_password);

                fetch(url,{
                    method: 'POST',
                    body: formData,
                    headers:{
                        'api-key': '4gh0bGp0VjU2aE1VKM23BHNkNaR212'
                    }
                })
                .then((response) => response.json())
                .then((jsonResponse) => 
                    {
                        if(jsonResponse.status){
                            this.success = jsonResponse.message;
                            this.show = false;
                        }
                        else{
                            this.error = jsonResponse.message;
                        }
                    }
                )
            }
        },
        validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        }
    }
})
 
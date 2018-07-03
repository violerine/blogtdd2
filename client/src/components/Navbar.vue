<template>
<div class="navbar">

 <!-- START NAV -->
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="../">
                        <img src="../assets/logoblog.png" alt="Logo">
                    </a>
                <span class="navbar-burger burger" @click="burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
                </span>
            </div>
            <div id="navbarMenu" class="navbar-menu">
                <div class="navbar-end">
                     <a v-if='user!==null' v-show="$route.path==='/profile'" class="navbar-item">
                     <router-link to="/"> <i class="fa fa-arrow-left" style="font-size:24px"></i></router-link> 
                    </a>
                    <a v-show="$route.path!=='/login'" v-if="user===null" class="navbar-item">
                            <router-link to="/login">Login</router-link>
                    </a>
                    <a v-if='user===null' v-show="$route.path!=='/register'" class="navbar-item">
                          <router-link to='/register'>  Create New Account </router-link>
                    </a>
                    <a v-if='user!==null' @click="createNewAccount" class="navbar-item">
                       Create New Account
                    </a>
                    <div v-if="user!==null" class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                               Welcome,{{username}}
                            </a>
                        <div class="navbar-dropdown">
                            <router-link to="/profile"><a class="navbar-item">
                                    Profile
                            </a></router-link>
                            <hr class="navbar-divider">
                            <a @click="logout" class="navbar-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- END NAV -->

</div>
</template>

<script>
export default {
    data:function(){
        return{
            user : localStorage.getItem('userid'),
            username : localStorage.getItem('name')
        }
        
    },  
    methods:{
        burger() {
            var burger = document.querySelector('.burger');
            var menu = document.querySelector('#'+burger.dataset.target);
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active')
        },
        logout(){
              swal({
                title: "Logout?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        localStorage.clear()
                        this.$router.push('/register')
                    } else {
                        // swal("Your imaginary file is safe!");
                    }
                });
            
        },
        createNewAccount(){
            swal({
                title: "Do you want to create new account?",
                text: "If you go to create account you will be logged out",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        localStorage.clear()
                        this.$router.push('/register')
                    } else {
                        // swal("Your imaginary file is safe!");
                    }
                });
            
        }
    }
}
</script>

<style scoped>
.navbar.is-white {
  background: #F0F2F4;
}


.navbar {
    background-color: rgb(255, 255, 255);
    min-height: 3.25rem;
    position: relative;
    z-index: 30;
}

.navbar-brand .brand-text {
  font-size: 1.11rem;
  font-weight: bold;
}
</style>

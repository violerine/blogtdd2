</<template>
       <section class="hero is-fullheight is-default is-bold">
        <div class="hero-head">
            <Navbar/>
        </div>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="columns is-vcentered">
                    <div class="column is-5">
                        <figure class="image is-4by3">
                            <img src="https://picsum.photos/800/600/?random" alt="Description">
                        </figure>
                    </div>
                    <div class="column is-6 is-offset-1">
                        <div class="box">
                        <h3 class="title has-text-black">Login</h3>
                            <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>

                            <button type="button" @click="login" class="button is-block is-link is-large is-fullwidth">Login</button>
                            
                        </form>
                    </div>
                        <!-- <h1 class="title is-2">
                            Superhero Scaffolding
                        </h1>
                        <h2 class="subtitle is-4">
                            Let this cover page describe a product or service.
                        </h2>
                        <br>
                        <p class="has-text-centered">
                            <a class="button is-medium is-info is-outlined">
                                Learn more
                            </a>
                        </p> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="hero-foot">
            <div class="container">
                <div class="tabs is-centered">
                    <ul>
                        <li><a>And this is the bottom</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
    components:{
        Navbar
    }
}
</script>

<style>

</style>

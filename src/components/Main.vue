<template>
    <z-view>
        <v-text-field solo v-model="password" v-if="!correctPassword"></v-text-field>
        <div v-if="validated">{{discordLink}}</div>
        <v-btn @click="validate" v-if="correctPassword && !validated">Antworten validieren</v-btn>
        <div slot="extension" v-if="correctPassword && !validated">
            <z-spot v-for="friend in friends"
                    :key="friend.id"
                    :to-view="spotObject(friend)"
                    :angle="angle(friend)"
                    :distance="150">
                {{friend.name}}
                <!-- <img src="http://via.placeholder.com/128x128?text=Test" /> -->
            </z-spot>
        </div>
    </z-view>
</template>

<script>
    export default {
        name: "Main",
        data: () => ({
            correctPassword: false,
            validated: false,
            discordLink: 'gg 8bCv3XS',
            password: '',
            friends: [
                {
                    name: 'Arne',
                    id: 0
                },
                {
                    name: 'Daniel',
                    id: 1
                },
                {
                    name: 'Erwin',
                    id: 2
                },
                {
                    name: 'Leonard',
                    id: 3
                },
                {
                    name: 'Nils',
                    id: 4
                },
                {
                    name: 'Vervi',
                    id: 5
                },
            ],
            correctAnswers: ['Leonard', 'Vervi', 'Daniel', 'Vervi', 'Nils', 'Erwin'],
            rotation: 0
        }),
        computed: {
            friendNames: function() {
                return this.friends.map(f => f.name);
            }
        },
        methods: {
            spotObject: function(friend) {
                return {
                    name: 'friend',
                    params: {
                        name: friend.name,
                        id: friend.id,
                    }
                }
            },
            angle: function(friend) {
                return (friend.id * 60 + this.rotation) % 360;
            },
            validate: function() {
                const answers = JSON.parse(localStorage.getItem('answers'));
                let correct = true;
                for (let i = 0; i < 6; i++) {
                    if (answers[i] !== this.correctAnswers[i]) correct = false;
                }
                if (correct) {
                    this.validated = true;
                }
            }
        },
        mounted: function() {
            setInterval(() => {
                this.rotation += 0.1;
            }, 16);
        },
        watch: {
            password: function(newV) {
                if (newV === '5895') this.correctPassword = true;
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <z-view>
        <p></p>
        <div v-if="currentHint" class="hint">
            {{ currentHint }}
        </div>
        <select v-model="selected" class="selection">
            <option disabled value="">Antwort auswählen</option>
            <option v-for="friend in friendNames">{{friend}}</option>
        </select>
        <div slot="extension">
            <z-spot button v-for="note in voicenotes" :key="note" :angle="angle(note)" :distance="150" v-on:click="playSound(note)">
                <div v-on:click="playSound(note)">
                    {{ noteText(note) }}
                </div>
            </z-spot>
        </div>
    </z-view>
</template>

<script>
    import _hints from '../data/hints';

    export default {
        name: "Friend",
        data: () => ({
            rotation: 0,
            selected: '',
            friendNames: ['Arne', 'Daniel', 'Erwin', 'Leo', 'Nils', 'Vervi'],
            answers: [],
            currentHint: '',
            hints: []
        }),
        computed: {
            props: function() {
                return this.$zircle.getParams();
            },
            voicenotes: function() {
                return [1,2,3,4,5]
            }
        },
        methods: {
            angle: function(note) {
                return (note * 72 + this.rotation) % 360;
            },
            playSound: async function(sound) {
                const basePath = 'https://sollunad.de/SURVEY_PROGRAM/sound';
                const friend = this.friendNames[this.props.id].toLowerCase();
                const path = `${basePath}/${friend}/${sound}.ogg`;
                const audio = new Audio(path);
                this.currentHint = this.hints[friend][sound - 1];
                audio.addEventListener('ended', () => {
                    this.currentHint = '';
                });
                await audio.play();
            },
            noteText: function (note) {
                if (note === 5) return '?';
                else return '!';
            }
        },
        mounted: function() {
            setInterval(() => {
                this.rotation -= 0.1;
            }, 16);
            this.answers = JSON.parse(localStorage.getItem('answers'));
            this.selected = this.answers[this.props.id];
            this.hints = _hints;
        },
        watch: {
            selected: function(newV) {
                this.answers[this.props.id] = newV;
                localStorage.setItem('answers', JSON.stringify(this.answers));
            }
        }
    }
</script>

<style scoped>
    .selection {
        text-align: center;
    }

    .hint {
        margin-bottom: 10px;
    }
</style>
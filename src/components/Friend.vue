<template>
    <z-view>
        <p></p>
        <select v-model="selected" class="selection">
            <option disabled value="">Antwort auswählen</option>
            <option v-for="friend in friendNames">{{friend}}</option>
        </select>
        <div slot="extension">
            <z-spot v-for="note in voicenotes" :key="note" :angle="angle(note)" :distance="150">
                {{note}}
            </z-spot>
        </div>
    </z-view>
</template>

<script>
    export default {
        name: "Friend",
        data: () => ({
            rotation: 0,
            selected: '',
            friendNames: ['Arne', 'Daniel', 'Erwin', 'Leo', 'Nils', 'Vervi'],
            answers: [],
        }),
        computed: {
            props: function() {
                return this.$zircle.getParams();
            },
            voicenotes: function() {
                return [0,1,2,3,4]
            }
        },
        methods: {
            angle: function(note) {
                return (note * 72 + this.rotation) % 360;
            }
        },
        mounted: function() {
            setInterval(() => {
                this.rotation -= 0.1;
            }, 16);
            this.answers = JSON.parse(localStorage.getItem('answers'));
            this.selected = this.answers[this.props.id];
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
</style>
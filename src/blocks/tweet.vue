<template>
    <div v-html="tweet.html"></div>
</template>
<script>
import Blockable from "@/lib/blockable";

export default {
    extends: Blockable,
    name: 'NotionTweet',
    data: () => ({
        tweet: {
            html: ''
        }
    }),
    async fetch() {
         if(this.properties.source&&this.properties.source[0]){
            const resp = await fetch(`https://codestead.io/api/twitter/oembed?url=${this.properties.source[0]}`)
            const data = await resp.json()
            if(data){
                this.tweet = data
            }
         }
    }
}
</script>
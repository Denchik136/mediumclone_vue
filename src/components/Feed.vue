<template>
  <div>
    <div class="" v-if="isLoading">Loading</div>
    <div class="" v-if="error">Something bad happened</div>

    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }">{{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            TAG LIST
          </ul>
        </router-link>
      </div>
      <mcv-pagination :total="total" :limit="limit" :current-page="currentPage" :url="url" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import feed from '@/api/feed'

export default {
  name: 'McvFeed',
  components: {
    McvPagination
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      total: 500,
      limit: 10,
      url: '/tags/dragons',
      currentPage: 5
    }
  },
  computed: {
    ...mapState({
      feed: (state) => state.feed.data,
      isLoading: (state) => state.feed.isLoading,
      error: (state) => state.feed.errors,
    }),
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getFeed, { apiUrl: this.apiUrl })
  },
}
</script>

type ImageUrls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

type Links = {
  self: string
  html: string
  download: string
  download_location: string
}

type UserProfileImage = {
  small: string
  medium: string
  large: string
}

type UserSocial = {
  instagram_username: string | null
  portfolio_url: string | null
  twitter_username: string | null
  paypal_email: string | null
}

type UserLinks = {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  following: string
  followers: string
}

type User = {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: string
  twitter_username: string | null
  portfolio_url: string | null
  bio: string | null
  location: string | null
  links: UserLinks
  profile_image: UserProfileImage
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_promoted_illustrations: number
  accepted_tos: boolean
  for_hire: boolean
  social: UserSocial
}

type TopicSubmissions = {
  spirituality?: {
    status: string
    approved_on: string
  }
}

type Tags = {
  type: string
  title: string
  source?: {
    ancestry: {
      type: { slug: string; pretty_slug: string }
      category: { slug: string; pretty_slug: string }
      subcategory: { slug: string; pretty_slug: string }
    }
    title: string
    subtitle: string
    description: string
    meta_title: string
    meta_description: string
    cover_photo: {
      id: string
      slug: string
      alternative_slugs: Record<string, string>
      created_at: string
      updated_at: string
      promoted_at: string | null
      width: number
      height: number
      color: string
      blur_hash: string
      description: string | null
      alt_description: string
      urls: ImageUrls
      links: Links
      likes: number
      liked_by_user: boolean
      sponsorship: string | null
      asset_type: string
      premium: boolean
      plus: boolean
      user: User
    }
  }
}

type AlternativeSlugs = {
  en: string
  es: string
  ja: string
  fr: string
  it: string
  ko: string
  de: string
  pt: string
}

type PhotoResult = {
  id: string
  slug: string
  alternative_slugs: AlternativeSlugs
  created_at: string
  updated_at: string
  promoted_at: string | null
  width: number
  height: number
  color: string
  blur_hash: string
  description: string | null
  alt_description: string
  breadcrumbs: string[]
  urls: ImageUrls
  links: Links
  likes: number
  liked_by_user: boolean
  current_user_collections: string[]
  sponsorship: string | null
  topic_submissions: TopicSubmissions
  asset_type: string
  user: User
  tags: Tags[]
}

type PhotoResponse = {
  total: number
  total_pages: number
  results: PhotoResult[]
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export const gtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args)
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (GA_TRACKING_ID) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPlanView = (planId: string, planTitle: string) => {
  trackEvent('view_plan', 'engagement', planTitle)
}

export const trackPlanClick = (planId: string, planTitle: string) => {
  trackEvent('click_plan_cta', 'conversion', planTitle)
}

export const trackCollabSubmit = () => {
  trackEvent('submit_collab_form', 'engagement')
}

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', 'engagement')
}
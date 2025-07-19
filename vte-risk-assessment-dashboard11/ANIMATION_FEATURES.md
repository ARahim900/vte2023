# Scroll-Triggered Animation Features

## Overview

This VTE Risk Assessment Dashboard now includes professional scroll-triggered animations that enhance the user experience and make the interface more engaging. The animations are built using Framer Motion and React Intersection Observer for optimal performance and accessibility.

## Features Implemented

### 1. Scroll-Triggered Reveal Animations
- **Fade In Up**: Elements slide up and fade in as they enter the viewport
- **Fade In Left/Right**: Elements slide in from the sides
- **Scale In**: Elements scale up from a smaller size
- **Slide In Up**: Elements slide up from below
- **Stagger Animations**: Multiple elements animate in sequence with delays

### 2. Interactive Animations
- **Hover Effects**: Cards lift and show enhanced shadows on hover
- **Button Interactions**: Scale and color transitions on button interactions
- **Table Row Animations**: Staggered row reveals for better data presentation
- **Chart Animations**: Smooth scaling and opacity transitions for charts

### 3. Performance Optimizations
- **Intersection Observer**: Only animates elements when they come into view
- **Reduced Motion Support**: Respects user's motion preferences
- **GPU Acceleration**: Uses transform properties for smooth animations
- **Lazy Loading**: Animations trigger only when needed

## Components

### AnimatedWrapper
A reusable wrapper component that provides scroll-triggered animations:

```tsx
<AnimatedWrapper
  animation={fadeInUp}
  delay={0.2}
  duration={0.8}
  threshold={0.1}
  triggerOnce={true}
>
  <YourContent />
</AnimatedWrapper>
```

### Specialized Components
- **AnimatedCard**: For card elements with hover effects
- **AnimatedHeader**: For page headers and titles
- **AnimatedTable**: For data tables with row animations
- **AnimatedChart**: For charts and visualizations
- **AnimatedList**: For lists with staggered item animations
- **AnimatedListItem**: For individual list items

## Animation Variants

### fadeInUp
```tsx
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};
```

### fadeInLeft
```tsx
const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 }
};
```

### scaleIn
```tsx
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};
```

## Usage Examples

### Basic Card Animation
```tsx
<AnimatedCard className="bg-white rounded-xl shadow-md">
  <h3>Card Title</h3>
  <p>Card content with smooth reveal animation</p>
</AnimatedCard>
```

### Staggered List Animation
```tsx
<AnimatedList>
  {items.map((item, index) => (
    <AnimatedListItem key={index} delay={index * 0.1}>
      {item.content}
    </AnimatedListItem>
  ))}
</AnimatedList>
```

### Custom Animation
```tsx
<AnimatedWrapper
  animation={{
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 }
  }}
  duration={1.2}
>
  <CustomComponent />
</AnimatedWrapper>
```

## CSS Enhancements

### Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 4px;
}
```

### Hover Effects
```css
.card-hover {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Accessibility Features

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Focus States
```css
*:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
```

## Performance Considerations

1. **Intersection Observer**: Only triggers animations when elements are visible
2. **Transform Properties**: Uses GPU-accelerated properties for smooth animations
3. **Easing Functions**: Custom cubic-bezier curves for natural motion
4. **Stagger Delays**: Prevents overwhelming the user with simultaneous animations
5. **Trigger Once**: Animations only play once per element to avoid repetition

## Browser Support

- **Modern Browsers**: Full support with hardware acceleration
- **Older Browsers**: Graceful degradation with basic transitions
- **Mobile Devices**: Optimized for touch interactions and performance
- **Screen Readers**: Proper ARIA attributes and reduced motion support

## Customization

### Animation Timing
```tsx
// Custom duration and delay
<AnimatedWrapper duration={1.5} delay={0.3}>
  <Content />
</AnimatedWrapper>
```

### Threshold Control
```tsx
// Trigger animation when 50% of element is visible
<AnimatedWrapper threshold={0.5}>
  <Content />
</AnimatedWrapper>
```

### Root Margin
```tsx
// Start animation 100px before element enters viewport
<AnimatedWrapper rootMargin="0px 0px -100px 0px">
  <Content />
</AnimatedWrapper>
```

## Best Practices

1. **Use Sparingly**: Don't over-animate - let content breathe
2. **Consistent Timing**: Use similar durations for related elements
3. **Meaningful Motion**: Animations should enhance, not distract
4. **Performance First**: Test on lower-end devices
5. **Accessibility**: Always respect user motion preferences

## Troubleshooting

### Animation Not Triggering
- Check if element is visible in viewport
- Verify Intersection Observer is supported
- Ensure element has sufficient height

### Performance Issues
- Reduce animation complexity
- Use `transform` instead of layout properties
- Consider reducing stagger delays

### Mobile Issues
- Test on actual devices
- Reduce animation intensity
- Ensure touch targets are large enough

## Future Enhancements

1. **Parallax Effects**: Subtle background parallax for depth
2. **Scroll Progress**: Animated progress indicators
3. **Page Transitions**: Smooth navigation between sections
4. **Micro-interactions**: Small delightful animations for user actions
5. **3D Transforms**: Advanced 3D animations for premium feel

---

This animation system provides a professional, engaging user experience while maintaining excellent performance and accessibility standards. 
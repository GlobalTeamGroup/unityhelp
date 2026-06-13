---
version: alpha
name: UNITY-design-system
description: "Editorial Serif archetype for medical narcology aggregator. Trust-first, empathetic, anonymous."
archetype: Editorial Serif
colors:
  primary: "#10B981"
  primary-light: "#34D399"
  primary-dark: "#059669"
  accent: "#0A1628"
  accent2: "#1E3A5F"
  accent-pastel: "#E0F2FE"
  danger: "#EF4444"
  warning: "#F59E0B"
  canvas: "#06040a"
  surface: "rgba(0,0,0,0.40)"
  ink: "#FFFFFF"
  ink-muted: "rgba(255,255,255,0.75)"
  card-bg: "rgba(0,0,0,0.45)"
  card-border: "rgba(16,185,129,0.25)"
  card-border-hover: "rgba(16,185,129,0.6)"
typography:
  display:
    fontFamily: "'DM Serif Display', serif"
    fontSize: "clamp(2.2rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "'DM Serif Display', serif"
    fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.7
  eyebrow:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(0.75rem, 1vw, 0.9rem)"
    fontWeight: 500
    letterSpacing: "0.15em"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "14px"
  lg: "24px"
  pill: "100px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    background: "#10B981"
    color: "#FFFFFF"
    rounded: "8px"
    padding: "14px 28px"
    fontWeight: 600
    fontSize: "0.95rem"
  button-danger:
    background: "#EF4444"
    color: "#FFFFFF"
    rounded: "8px"
    padding: "14px 28px"
  card:
    background: "rgba(0,0,0,0.45)"
    border: "1.5px solid rgba(16,185,129,0.25)"
    borderRadius: "14px"
    backdropFilter: "blur(10px)"
  card-inverted:
    background: "rgba(255,255,255,0.85)"
    border: "1.5px solid rgba(10,21,48,0.12)"
    borderRadius: "14px"
cinematic-scroll-engine:
  lerp: 0.02
  concurrency: 48
  frameFormat: "webp"
  frameNaming: "frame_%06d.webp"
  desktopWidth: 1920
  mobileWidth: 768
---

## Overview

UNITY — агрегатор наркологических клиник России. Дизайн построен на архетипе **Editorial Serif**, адаптированном для медицинской ниши. Ключевые принципы:

1. **Trust-first**: Teal (#10B981) как цвет надежды и доверия, вместо стандартного синего медицины
2. **Empathy**: Тёплый тон, serif-заголовки создают авторитет без холодности
3. **Anonymity visual**: Тёмный фон (анонимность) с тёплыми кремовыми инвертированными секциями (надежда)
4. **Mobile-first**: 70%+ трафика с мобильных, кризисные ситуации

## Colors

- **Teal (#10B981)** — надежда, свобода, выздоровление. Главный CTA-цвет
- **Deep Navy (#0A1628)** — профессионализм, анонимность, доверие
- **Danger Red (#EF4444)** — срочность: «Позвоните сейчас», emergency CTA
- **Warning Gold (#F59E0B)** — рейтинги, звёзды, highlights
- **Canvas (#06040a)** — основной фон (чёрный кинематографический)

## Typography

- **DM Serif Display** — заголовки. Serif = авторитет в медицине
- **DM Sans** — body text. Чистый, читаемый sans-serif

## Layout Patterns Used

1. **Split Hero** — главный герой с поиском
2. **Bento Grid** — услуги (8 карточек)
3. **Floating Stats** — цифры/доверие
4. **Full-Bleed Quote** — миссия
5. **Card Carousel** — клиники

## Section Rhythm

```
dark hero (Split Hero) → dark services (Bento Grid) → INVERTED-CREAM stats → dark clinics (Carousel) → dark quote → INVERTED-CREAM how-it-works → dark CTA
```

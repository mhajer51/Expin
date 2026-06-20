/// <reference types="nativewind/types" />

declare module 'expo-linear-gradient' {
  import type { ComponentType } from 'react';
  import type { ViewProps } from 'react-native';
  export const LinearGradient: ComponentType<
    ViewProps & {
      colors: readonly [string, string, ...string[]];
      start?: { x: number; y: number };
      end?: { x: number; y: number };
    }
  >;
}

declare module 'expo-blur' {
  import type { ComponentType } from 'react';
  import type { ViewProps } from 'react-native';
  export const BlurView: ComponentType<
    ViewProps & { intensity?: number; tint?: 'light' | 'dark' | 'default' }
  >;
}

declare module 'expo-haptics' {
  export enum NotificationFeedbackType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
  }
  export enum ImpactFeedbackStyle {
    Light = 'light',
    Medium = 'medium',
    Heavy = 'heavy',
  }
  export function notificationAsync(type: NotificationFeedbackType): Promise<void>;
  export function impactAsync(style: ImpactFeedbackStyle): Promise<void>;
}

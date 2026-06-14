'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

export function Notification({ message, type = 'info', duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <AlertCircle className="w-5 h-5 text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 z-50 ${bgColors[type]} backdrop-blur-sm border rounded-xl p-4 shadow-2xl max-w-sm`}
        >
          <div className="flex items-start gap-3">
            {icons[type]}
            <p className="text-white text-sm flex-1">{message}</p>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 300);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global notification manager
let notificationQueue: Array<{ message: string; type: NotificationType }> = [];
let setNotifications: React.Dispatch<React.SetStateAction<Array<{ id: string; message: string; type: NotificationType }>>> | null = null;

export function showNotification(message: string, type: NotificationType = 'info') {
  if (setNotifications) {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotificationsState] = useState<Array<{ id: string; message: string; type: NotificationType }>>([]);

  useEffect(() => {
    setNotifications = setNotificationsState;
    return () => {
      setNotifications = null;
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotificationsState((prev) => prev.filter((n) => n.id !== id));
  };

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timers = notifications.map((notification) =>
        setTimeout(() => {
          removeNotification(notification.id);
        }, 5000)
      );

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [notifications]);

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className={`${
                notification.type === 'success' ? 'bg-green-500/20 border-green-500/30' :
                notification.type === 'error' ? 'bg-red-500/20 border-red-500/30' :
                'bg-blue-500/20 border-blue-500/30'
              } backdrop-blur-sm border rounded-xl p-4 shadow-2xl max-w-sm`}
            >
              <div className="flex items-start gap-3">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
                {notification.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-400" />}
                <p className="text-white text-sm flex-1">{notification.message}</p>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

import { motion } from 'motion/react';
import { TrendingUp, Headset, Users, Zap } from 'lucide-react';

interface StatsBarProps {
  className?: string;
}

export function StatsBar({ className = '' }: StatsBarProps) {
  const stats = [
    { value: '99.9%', label: 'Uptime garantie', icon: TrendingUp, color: 'text-emerald-600' },
    { value: '24/7', label: 'Support beschikbaar', icon: Headset, color: 'text-sky-600' },
    { value: '200+', label: 'Tevreden klanten', icon: Users, color: 'text-indigo-600' },
    { value: '<15 min', label: 'Reactietijd', icon: Zap, color: 'text-violet-600' }
  ];

  return (
    <section className={`py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-${stat.color.split('-')[1]}-100 to-${stat.color.split('-')[1]}-50 dark:from-${stat.color.split('-')[1]}-900/30 dark:to-${stat.color.split('-')[1]}-900/10 mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color} dark:opacity-90`} />
                </div>
                <div className={`text-3xl mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
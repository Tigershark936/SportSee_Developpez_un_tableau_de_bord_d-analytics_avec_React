import PropTypes from 'prop-types';
import styles from './LineChart.module.scss';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MyLineChart = ({ sessions = [] }) => {
  // Labels d’affichage uniquement
  const dayShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Données avec index unique pour l’axe
  const data = sessions.map((d, i) => ({
    ...d,
    dayIndex: i, // <-- clé unique pour X
    dayShort: dayShort[i] || `${i + 1}`, // Si jamais il y a moins de 7 jours
  }));

  return (
    <div className={styles.wrapper}>
      <p className={styles.LineChartTitle}>Durée moyenne des<span className={styles.span}>sessions</span></p>

      <ResponsiveContainer className={styles.LineChart} width={258} height={263}>
        <LineChart data={data}>
          <XAxis
            dataKey="dayIndex" // <-- utilise l’index
            tickFormatter={(i) => dayShort[i] || i + 1}  // <-- affiche L/M/M/...
            tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
            axisLine={false}
            tickLine={false}
            tickMargin={0}
            interval={0}
            padding={{ left: 15, right: 15 }}
          />
          <YAxis
            hide
            dataKey="sessionLength"
            domain={['dataMin-10', 'dataMax+10']}
          />
          {/* Avec Defs: on y stocke des éléments graphiques réutilisables (dégradés, filtres, motifs...). */}
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0"   stopColor="rgba(255,255,255,0.3)" />
                <stop offset="0.2" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="0.4" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="0.6" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="1"   stopColor="rgba(255,255,255,1)" />
            </linearGradient>
        </defs>
          <Tooltip
            labelFormatter={() => ''}
            formatter={(value) => [`${value} min`]}
            itemStyle={{ width: 39, height: 25, fontWeight: 500, fontSize: 8, color: '#000',textAlign: 'center'}}
          />
        <defs>
            {/* Filtre "glow" pour effet LED blanc */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                {/* Ombre portée floue */}
                <feDropShadow 
                    dx="0" dy="0" 
                    stdDeviation="5" 
                    floodColor="#fff" 
                    floodOpacity="1" 
                />
            </filter>
        </defs>
          <Line
            type="natural"
            stroke="url(#colorUv)"
            dataKey="sessionLength"
            strokeWidth={2} // épaisseur de la ligne 
            activeDot={({ cx, cy }) => (
                <circle
                cx={cx}
                cy={cy}
                r={5} // taille du point
                fill="#fff" // couleur de remplissage
                stroke="#fff" // contour 
                strokeWidth={2} // épaisseur du contour
                filter='url(#glow)'
                />
            )}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

MyLineChart.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.number,
    sessionLength: PropTypes.number,
  })).isRequired,
};

export default MyLineChart;

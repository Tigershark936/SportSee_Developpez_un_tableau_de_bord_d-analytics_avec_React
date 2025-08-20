import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import styles from './RadarChart.module.scss';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Permet de mettre dans l'ordre le choix des kind pour le radarchart
const ORDER = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio' ]; 

const MyRadarChart = ({performance = []}) => {
    const formatLabel = useCallback((v) => {
        const labelLower = String(v).toLowerCase();
            if (labelLower === 'energy') return 'Énergie';
            if (labelLower === 'strength') return 'Force';
            if (labelLower === 'speed') return 'Vitesse';
            if (labelLower === 'intensity') return 'Intensité';
            if (labelLower === 'endurance') return 'Endurance';
            if (labelLower === 'cardio') return 'Cardio';
        return v;
    }, []);

    // Tri des points du radar selon l’ordre souhaité
    const sortedData = useMemo(() => {
        const index = (k) => ORDER.indexOf(String(k).toLowerCase());
        return [...performance].sort((a, b) => index(a.kind) - index(b.kind));
    }, [performance]);

    return (
        <div className={styles.RadarChart}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%" 
                    data={sortedData}
                >
                    <PolarGrid 
                        radialLines={false}
                    />
                    <PolarAngleAxis
                        dataKey="kind"
                        tick={(props) => {
                        const { x, y, payload, textAnchor } = props;
                            return (
                                <text
                                    x={x}
                                    y={y + 1}
                                    fill="#ffffff"
                                    fontSize={12}
                                    textAnchor={textAnchor}
                                    dominantBaseline="middle"
                                >
                                    {formatLabel(payload.value)}
                                </text>
                            );
                        }}
                    />
                    <PolarRadiusAxis 
                        tickCount={6}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar 
                        dataKey="value" 
                        stroke="#e60000ff" 
                        fill="#e60000ff"
                        fillOpacity={0.6} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

MyRadarChart.propTypes = {
    /**
    * performance : tableau d’objets 
    * Chaque objet doit contenir :
    *  - kind  : string parmi la liste ORDER 
    *  - value : number (valeur affichée par le radar)
    */
  performance: PropTypes.arrayOf(
    PropTypes.shape({
      // on contraint aux valeurs de ORDER (sécurise contre une faute de frappe)
      kind: PropTypes.oneOf(['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio']).isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default MyRadarChart
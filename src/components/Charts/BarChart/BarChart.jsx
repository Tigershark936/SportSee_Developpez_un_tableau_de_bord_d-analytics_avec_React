import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ activity = [] }) => {
    // Option: transformer les dates en 1..7 pour l’axe X
    const data = activity.map((d, i) => ({
        ...d,
        dayLabel: i + 1, // 1..7
    }));
    
    return (
        <ResponsiveContainer width='100%' height={320}>
            <BarChart
                data={data}
                margin={{ top: 112.5, right: 90, left: 32, bottom: 5 }}
            >
                {/* vertical={false} → enlève toutes les lignes verticales (axe X)
                horizontal={false} → enlève toutes les lignes horizontales (axe Y) */}
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                />

                {/* Y droite pour kg */}
                <XAxis 
                    dataKey="dayLabel"
                    tickLine={false}
                    tick={{ fill: 'rgba(155, 158, 172, 1)', fontSize: 14 }}
                    tickMargin={16}
                />
                {/* Y gauche caché pour kCal */}
                <YAxis
                    dataKey="kilogram"
                    orientation="right"
                    axisLine={false} // cache la ligne de base de l’axe
                    tickLine={false} // cache les petits traits des graduations
                    tick={{ fill: 'rgba(155, 158, 172, 1)', fontSize: 14, textAnchor: 'middle'}}
                    tickMargin={45}
                    domain={['dataMin-2', 'dataMax+1']}
                    tickCount={3}
                />
                {/* Avec Tooltip, Recharts affiche automatiquement les valeurs de chaque série à la position du curseur. */}
                <Tooltip
                    cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
                    labelFormatter={() => ''}
                    separator=""
                    itemSorter={(item) => (item.dataKey === 'kilogram' ? -1 : 1)} 
                    formatter={(value, _name, { dataKey }) => [
                        `${value} ${dataKey === 'kilogram' ? 'kg' : 'kCal'}`,
                        ''
                    ]}
                    contentStyle={{ width: 39, height: 63, background: "#e60000ff", textAlign: 'center', padding: '11px 4px'}}
                    itemStyle={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: 7, color: '#fff' }}
                />
                <Legend
                    iconType="circle"
                    iconSize={8}
                    align="right"
                    verticalAlign="top"
                    layout="horizontal"
                    wrapperStyle={{ top: 23, right: 26 , fontSize: 14}} 
                    formatter={(value) => (
                        <span style={{ color: 'rgba(116,121,140,1)' }}>{value}</span>
                    )}
                />
                <Bar 
                    dataKey="kilogram"
                    name="Poids (kg)" 
                    fill="#282d30ff" 
                    radius={[3, 3, 0, 0]} 
                    barSize={7}
                />
                <Bar 
                    dataKey="calories"
                    name="Calories brûlées (kCal)"
                    fill="#e60000ff" 
                    radius={[3, 3, 0, 0]}
                    yAxisId="kcal"
                    barSize={7}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

MyBarChart.PropTypes = {

    activity: PropTypes.object.isRequired
}
export default MyBarChart
import PropTypes from 'prop-types';
import styles from './LineChart.module.scss';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Cursor custom : ombrage au survol
 * - Couvre toute la hauteur utile du chart + la zone des ticks (L M M J V S D)
 * - S'étend du point actif jusqu'au bord droit
*/
const ShadowCursor = (props) => {
  /** Ici je prends dans props les valeurs width, height et points.
  * Si width ou height ne sont PAS donnés → je mets 0 par défaut.
  * Exemple :
  * props = { width: 250 }  => width=250, height=0, points=undefined
  * props = {}              => width=0,   height=0, points=undefined
  */
  const { width = 0, height = 0, points } = props;

  /** 
  * Sécurité : Si largeur ou la hauteur n'est pas bonnes → j’arrête tout et je dessine rien
  * Ici je vérifie 4 cas :
  * - !Number.isFinite(width)  → width n’est PAS un vrai nombre (NaN, Infinity, -Infinity)
  * - width <= 0               → largeur vide ou négative
  * - !Number.isFinite(height) → height n’est PAS un vrai nombre
  * - height <= 0              → hauteur vide ou négative
  * Si un de ces cas est vrai → je retourne null = je n’affiche rien.
  */
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
    return null;
  }

  /** Je cherche la position X du point actif :
  * - Si j’ai bien des points, que le 1er existe, et que son X est un vrai nombre → je prends ce X
  * - Sinon → je mets 0 par défaut
  */ 
  const cursorX = (points && points[0] && Number.isFinite(points[0].x))
    ? points[0].x
    : 0;

  /**
  * Je prends le "payload" (les données brutes) du point actif :
  * payload = les données du point sur lequel on est
  * (ex: { dayIndex, sessionLength, __ghost })
  * - Si points existe, que j’ai bien un 1er point, et qu’il a un payload → je le garde
  * - Sinon → je mets null (rien)
  */
  const activePayload = points && points[0] && points[0].payload ? points[0].payload : null;

  /**
  * Vérifications :
  * - isGhost → true si le point est un point fantôme (ajouté juste pour "toucher les bords")
  * - isFirstRealPoint → true si le point est le tout premier vrai point (dayIndex === 0, au-dessus du "L")
  * 
  * Ces deux cas servent à ne pas afficher d’ombre ou de tooltip
  */
  const isGhost = !!(activePayload && activePayload.__ghost);
  const isFirstRealPoint = !!(activePayload && activePayload.dayIndex === 0);

  /**
  * Si on est sur un point fantôme (bord gauche/droit)
  * OU si on est sur le 1er point réel (au-dessus du "L"),
  * alors → on ne dessine PAS d’ombre (return null)
  */
  if (isGhost || isFirstRealPoint) {
    return null;
  }

  /**
  * Je prépare le rectangle d’ombre :
  * - rectX = position de départ (X du point actif, minimum 0 pour pas sortir du LineChart)
  * - rectW = largeur du rectangle (du point actif jusqu’au bord droit)
  *   +1 pour être sûr de couvrir tout le bord droit (évite un pixel vide à la fin)
  */
  const rectX = Math.max(0, cursorX);
  const rectW = Math.max(0, width - rectX + 1);

  /**
  * EXTRA_BOTTOM_FOR_TICKS = marge ajoutée en bas
  * Permet d’étendre l’ombre jusqu'en dessous des libellés de l’axe X ("L M M J V S D")
  * estimation ~30px = hauteur des ticks/labels
  */
  const EXTRA_BOTTOM_FOR_TICKS = 30;

  return (
    <rect
      x={rectX} // x = rectX (démarre au point actif)
      y={0} // y = 0 (prend depuis le haut du LineChart)
      width={rectW} // width = rectW (s’étend jusqu’au bord droit)
      height={height + EXTRA_BOTTOM_FOR_TICKS} // height = height + EXTRA_BOTTOM_FOR_TICKS (couvre aussi les labels en bas)
      fill="rgba(0, 0, 0, 0.12)" // fill = couleur grise transparente (effet d’ombre)
      pointerEvents="none"
    />
  );
};


const MyLineChart = ({ sessions = [] }) => {
  // Labels d’affichage uniquement
  const dayShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Données avec index unique pour l’axe
  const data = sessions.map((d, i) => ({
    ...d,
    dayIndex: i, // <-- clé unique pour X
    dayShort: dayShort[i % 7], // boucle sur la semaine
  }));

  /**
  *  Astuce pour "touche les bords"
  * On ajoute 2 points FANTÔMES à la ligne pour que le trait colle visuellement aux bords du chart :
  *  - un AVANT le 1er vrai point  → index -0.5
  *  - un APRÈS le dernier         → index n - 0.5
  * Ces points ont __ghost: true pour qu’on NE montre ni dot ni tooltip dessus.
  * Les points réels gardent __ghost: false.
  */
  const n = data.length;
  const extendedData = n > 0
    ? [
        { ...data[0], dayIndex: -0.5, __ghost: true },        // point fantôme avant
        ...data.map(pt => ({ ...pt, __ghost: false })),       // points réels
        { ...data[n - 1], dayIndex: n - 0.5, __ghost: true }, // point fantôme après
      ]
    : data;

  /**
  * Ticks réels pour l’axe X
  * On affiche les labels uniquement aux positions des VRAIS points (0..n-1).
  * Les points fantômes (-0.5 et n-0.5) ne sont pas dans la liste des ticks,
  * donc ils n’influencent pas les libellés ("L M M J V S D").
  */
  const ticks = data.map((_, i) => i);

  /**
  * Domaine X numérique (l’axe horizontal du graph)
  *
  * - Si j’ai des données (n > 0) :
  *    → Domaine = [-0.5, n-0.5]
  *    → Ça permet à la ligne de coller visuellement aux bords gauche et droit
  *
  * - Si je n’ai PAS de données (n === 0) :
  *    → Domaine = [0, 1]
  *    → Domaine neutre juste pour éviter que le graph plante
  *
  * Pourquoi -0.5 et n-0.5 ?
  * - On décale d’une DEMI-case à gauche et à droite
  * - Si on mettait -1 et n → la ligne dépasserait trop du chart
  * - Avec -0.5 et n-0.5 → ça touche pile les bords sans décaler les labels
  *
  * Les ticks (0..n-1) sont calculés à part → donc les labels "L M M J V S D" restent bien alignés
  */
  const xDomain = n > 0 ? [-0.5, n - 0.5] : [0, 1];

  return (
    <div className={styles.wrapper}>
      <p className={styles.LineChartTitle}>Durée moyenne des<span className={styles.span}>sessions</span></p>

      <ResponsiveContainer className={styles.LineChart} width={258} height={263}>
        <LineChart
          data={extendedData}  // on donne au chart avec les points étendus
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }} // supprime les marges internes
        >
          <XAxis
            type="number"
            dataKey="dayIndex" // utilise l’index numérique
            domain={xDomain}   // étend un peu à gauche/droite pour toucher les bords
            ticks={ticks}      // affiche uniquement les positions réelles (0..n-1)
            tickFormatter={(i) => dayShort[((i % 7) + 7) % 7]} // Reboucle sur les 7 jours : 0..6 => L M M J V S D, puis 7 => L, 8 => M, etc.
            tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
            axisLine={false}
            tickLine={false}
            tickMargin={0}
            interval={0}
          />
          <YAxis
            hide
            dataKey="sessionLength"
            domain={['dataMin-10', 'dataMax+10']}
          />

          {/** Avec Defs: = balise spéciale SVG
          * - Sert à définir des effets graphiques réutilisables (dégradés, filtres, motifs…)
          * - Ne dessine rien directement → c’est juste un placard à recettes visuelles
          * - On applique ensuite ces effets avec url(#id) sur un élément du graph 
          */}
          <defs>
            {/* Dégradé de la line */}
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0"   stopColor="rgba(255,255,255,0.3)" />
              <stop offset="0.2" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="0.4" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="0.6" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="1"   stopColor="rgba(255,255,255,1)" />
            </linearGradient>

            {/* Filtre "glow" pour effet LED blanc sur le dot actif */}
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

          <Tooltip
            // on masque le label par défaut
            labelFormatter={() => ''}
            // Affiche notre curseur custom à droite du point actif (inclut les ticks)
            cursor={<ShadowCursor />}

            /**
            * Tooltip custom :
            * - Cas 1 : pas de données → rien affiché
            * - Cas 2 : point fantôme (__ghost) → rien affiché
            * - Cas 3 : point réel → affiche "valeur min" dans une boîte blanche
            */
            content={({ payload }) => {
              if (!payload || !payload.length) return null; // pas de données → rien
              const p0 = payload[0]?.payload;
              if (p0 && p0.__ghost) return null; // pas de tooltip sur les points fantômes
              const value = payload[0]?.value; // valeur de sessionLength
              return (
                <div style={{ background: '#fff', border: 'none', padding: '4px 6px' }}>
                  <span style={{ 
                    width: 39, 
                    height: 25, 
                    fontWeight: 500, 
                    fontSize: 8, 
                    color: '#000', 
                    textAlign: 'center', 
                    display: 'inline-block' 
                    }}
                  >
                    {value} min
                  </span>
                </div>
              );
            }}
          />

          <Line
            type="natural" // trace une ligne lissée (courbe naturelle).
            stroke="url(#colorUv)" // applique mon dégradé défini dans <defs> (id="colorUv").
            dataKey="sessionLength" // chaque point prend la valeur sessionLength de ton dataset.
            strokeWidth={2} // épaisseur de la ligne 
            dot={false}
            
            /**
            * Point actif (activeDot) :
            * - Cas 1 : si point fantôme (__ghost) → aucun dot
            * - Cas 2 : si point réel → affiche un cercle blanc avec effet glow
            */
            activeDot={({ cx, cy, payload }) => {
              if (payload && payload.__ghost) return null;  // pas de dot pour les points fantômes
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4} // taille du point
                  fill="#fff" // couleur de remplissage
                  stroke="#fff" // contour 
                  strokeWidth={2} // épaisseur du contour
                  filter='url(#glow)' // // applique de mon filtre glow défini dans <defs>
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

ShadowCursor.propTypes = {
  /**
  * Vérification des props de ShadowCursor
  * - width  : nombre (largeur du chart)
  * - height : nombre (hauteur du chart)
  * - points : tableau (coordonnées du point actif fournies par Recharts)
  */
  width: PropTypes.number,
  height: PropTypes.number,
  points: PropTypes.array,
};

MyLineChart.propTypes = {
  /**
  * Vérification des props de MyLineChart
  * sessions : tableau obligatoire (isRequired)
  * Chaque élément du tableau doit être un objet avec :
  * day: nombre (index du jour)
  * sessionLength: nombre (durée de la session en minutes)
  */
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      sessionLength: PropTypes.number,
    })
  ).isRequired,
};

export default MyLineChart;

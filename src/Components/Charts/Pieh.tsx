import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
export default function Pieh() {
  const data = [
    {
      subject: "Bluefield",
      A: 120,
      B: 110,
      fullMark: 150
    },
    {
      subject: "Veteran ltd",
      A: 98,
      B: 130,
      fullMark: 150
    },
    {
      subject: "Heal9",
      A: 86,
      B: 130,
      fullMark: 150
    },
    {
      subject: "CureX",
      A: 99,
      B: 100,
      fullMark: 150
    },
    {
      subject: "PhyX",
      A: 85,
      B: 90,
      fullMark: 150
    },
    {
      subject: "Histo",
      A: 65,
      B: 85,
      fullMark: 150
    }
  ];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Bluefield" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}

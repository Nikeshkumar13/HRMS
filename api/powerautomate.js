export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, payload } = req.body;

  const targetUrl = "https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/32d29bc5cc6e420cac497b0ccfb9a377/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-NecT107HREmsfNzJV6X2JdL40-Q0qfXAggzr7paVH4";

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });

    const responseText = await response.text();
    let data = {};
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText };
      }
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error proxying ${action}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

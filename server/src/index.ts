import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {incidents,runbooks} from './data.js';
import {getIncident,investigateDemo,investigateWithAzure} from './investigate.js';
const app=express();
app.disable('x-powered-by');
app.use(cors({origin:process.env.CORS_ORIGIN||'http://localhost:5173'}));
app.use(express.json({limit:'32kb'}));
app.get('/api/health',(_req,res)=>res.json({status:'ok',provider:process.env.MODEL_PROVIDER||'demo'}));
app.get('/api/incidents',(_req,res)=>res.json(incidents.map(({logs,...rest})=>rest)));
app.get('/api/incidents/:id',(req,res)=>{const item=getIncident(req.params.id);if(!item)return res.status(404).json({error:'Incident not found'});res.json(item);});
app.get('/api/runbooks',(_req,res)=>res.json(runbooks));
app.post('/api/incidents/:id/investigate',async(req,res)=>{
 const incident=getIncident(req.params.id);
 if(!incident)return res.status(404).json({error:'Incident not found'});
 try{const result=process.env.MODEL_PROVIDER==='azure-openai'?await investigateWithAzure(incident):investigateDemo(incident);res.json(result);}
 catch(error){const isTimeout=error instanceof Error&&(error.name==='TimeoutError'||error.name==='AbortError');console.error(JSON.stringify({event:'investigation_failed',incidentId:incident.id,kind:isTimeout?'timeout':'provider_error'}));res.status(isTimeout?504:502).json({error:isTimeout?'Model request timed out':'Investigation provider failed'});}
});
app.post('/api/incidents/:id/actions/:action',(_req,res)=>res.status(403).json({error:'Remediation is disabled in this demo. Human approval workflow not yet implemented.'}));
const port=Number(process.env.PORT||4000);
app.listen(port,()=>console.log(`AI Ops API listening on http://localhost:${port}`));
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getIncident,findRunbooks,investigateDemo,InvestigationSchema} from './investigate.js';
test('finds incident and relevant runbook',()=>{const i=getIncident('INC-1042');assert.ok(i);assert.ok(findRunbooks(i).some(r=>r.id==='RB-VM-01'));});
test('demo investigation is structured and approval-gated',()=>{const i=getIncident('INC-1043');assert.ok(i);const r=investigateDemo(i);assert.equal(r.actionRequiresApproval,true);assert.equal(r.provider,'demo (deterministic, no LLM)');assert.ok(r.evidence.length>0);assert.ok(InvestigationSchema.safeParse(r).success);});
test('unknown incident does not exist',()=>assert.equal(getIncident('unknown'),undefined));
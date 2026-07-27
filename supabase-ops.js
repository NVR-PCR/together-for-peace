/**
 * Supabase Client and Database Operations
 * 
 * This module handles all Supabase interactions for the Together for Tomorrow website.
 * It reads credentials from Vercel environment variables (SUPABASE_URL, SUPABASE_ANON).
 * 
 * Tables used:
 * - public.contact_info (email, name, class_role)
 * - public.newsletter (email)
 * - public.survey_responses (ans1-ans9, ansA-ansF as integers)
 */

(function(global) {
  'use strict';

  // Initialize Supabase client
  function initSupabase() {
    const SUPABASE_URL = global.SUPABASE_URL || '';
    const SUPABASE_ANON = global.SUPABASE_ANON || '';

    if (!SUPABASE_URL || !SUPABASE_ANON) {
      console.error('Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_ANON environment variables.');
      return null;
    }

    if (!global.supabase || !global.supabase.createClient) {
      console.error('Supabase JS library not loaded.');
      return null;
    }

    try {
      return global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  // Store contact info in contact_info table
  async function storeContactInfo(db, data) {
    if (!db) {
      throw new Error('Supabase client not initialized');
    }

    const { email, name, class_role } = data;

    if (!email || !name || !class_role) {
      throw new Error('Missing required fields: email, name, class_role');
    }

    const { data: result, error } = await db
      .from('contact_info')
      .upsert({
        email: email.trim(),
        name: name.trim(),
        class_role: class_role.trim()
      }, {
        onConflict: 'email'
      });

    if (error) {
      console.error('Error storing contact info:', error.message);
      throw error;
    }

    return result;
  }

  // Store newsletter subscription in newsletter table
  async function storeNewsletterSubscription(db, email) {
    if (!db) {
      throw new Error('Supabase client not initialized');
    }

    if (!email || !email.trim()) {
      throw new Error('Email is required');
    }

    const { data: result, error } = await db
      .from('newsletter')
      .upsert({
        email: email.trim().toLowerCase()
      }, {
        onConflict: 'email'
      });

    if (error) {
      console.error('Error storing newsletter subscription:', error.message);
      throw error;
    }

    return result;
  }

  // Store survey responses in survey_responses table
  // Answers are stored as option numbers (integers) in ans1-ans9, ansA-ansF columns
  async function storeSurveyResponse(db, answers) {
    if (!db) {
      throw new Error('Supabase client not initialized');
    }

    if (!answers || typeof answers !== 'object') {
      throw new Error('Answers must be an object');
    }

    // Map answers to the expected column format (ans1-ans9, ansA-ansF)
    // answers should be an array of integers where index corresponds to question number
    // e.g., [1, 3, 2, ...] means Q1=option1, Q2=option3, Q3=option2
    const payload = {};

    // Handle numeric questions (ans1-ans9)
    for (let i = 0; i < 9; i++) {
      if (answers[i] !== undefined && answers[i] !== null) {
        payload[`ans${i + 1}`] = parseInt(answers[i], 10);
      }
    }

    // Handle lettered questions (ansA-ansF)
    const letterKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < letterKeys.length; i++) {
      const key = `ans${letterKeys[i]}`;
      if (answers[9 + i] !== undefined && answers[9 + i] !== null) {
        payload[key] = parseInt(answers[9 + i], 10);
      }
    }

    const { data: result, error } = await db
      .from('survey_responses')
      .insert(payload);

    if (error) {
      console.error('Error storing survey response:', error.message);
      throw error;
    }

    return result;
  }

  // Alternative method: store survey responses by question text mapping
  async function storeSurveyResponseByIndex(db, questionAnswers) {
    if (!db) {
      throw new Error('Supabase client not initialized');
    }

    if (!questionAnswers || typeof questionAnswers !== 'object') {
      throw new Error('Question answers must be an object');
    }

    const payload = {};

    // questionAnswers is expected to be an object like:
    // { "Question 1": 1, "Question 2": 3, ... } or { 0: 1, 1: 3, ... }
    // We map these to ans1, ans2, etc. based on order
    
    const keys = Object.keys(questionAnswers);
    keys.forEach((key, index) => {
      const value = questionAnswers[key];
      if (value !== undefined && value !== null) {
        // Determine if this should be numeric (1-9) or lettered (A-F)
        if (index < 9) {
          payload[`ans${index + 1}`] = parseInt(value, 10);
        } else if (index < 15) {
          const letterIndex = index - 9;
          const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
          payload[`ans${letters[letterIndex]}`] = parseInt(value, 10);
        }
      }
    });

    const { data: result, error } = await db
      .from('survey_responses')
      .insert(payload);

    if (error) {
      console.error('Error storing survey response:', error.message);
      throw error;
    }

    return result;
  }

  // Export functions to global scope
  global.SupabaseOps = {
    initSupabase,
    storeContactInfo,
    storeNewsletterSubscription,
    storeSurveyResponse,
    storeSurveyResponseByIndex
  };

})(typeof window !== 'undefined' ? window : this);

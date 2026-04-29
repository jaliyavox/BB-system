import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, Loader2, ShieldCheck, SkipForward, Upload } from 'lucide-react';
import { ownerDashboardApi } from '../api/ownerDashboardApi';

type KycField = 'nicFront' | 'nicBack' | 'selfie';

export default function OwnerKycOnboarding() {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted');
  const [rejectionReason, setRejectionReason] = useState('');
  const [files, setFiles] = useState<Record<KycField, File | null>>({ nicFront: null, nicBack: null, selfie: null });
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('bb_access_token')) {
      navigate('/signin', { replace: true });
      return;
    }

    ownerDashboardApi.getKycStatus()
      .then((data) => {
        setKycStatus(data.kycStatus);
        setRejectionReason(data.kycRejectionReason || '');
      })
      .catch(() => {
        setKycStatus('not_submitted');
      })
      .finally(() => setStatusLoading(false));
  }, [navigate]);

  const handleUpload = (field: KycField, file?: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file || null }));
  };

  const handleSubmit = async () => {
    if (!files.nicFront || !files.nicBack || !files.selfie) {
      setError('Please upload all 3 documents before submitting.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await ownerDashboardApi.submitKyc({
        nicFront: files.nicFront,
        nicBack: files.nicBack,
        selfie: files.selfie,
      });
      setSuccess('KYC submitted successfully. Taking you to the dashboard...');
      setTimeout(() => navigate('/owner/dashboard?tab=kyc', { replace: true }), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'KYC submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/owner/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1124] via-[#131d3a] to-[#0b132b] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Complete your owner KYC</h1>
              <p className="text-sm text-gray-300">Upload now, or skip and finish later from your dashboard.</p>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
            <p className="text-sm font-semibold">KYC is required to add listings</p>
            <p className="mt-1 text-xs text-amber-100/80">If you skip, you can still access the dashboard, but house and room listing actions will be blocked until verification is approved.</p>
          </div>

          {statusLoading ? (
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <Loader2 size={16} className="animate-spin" /> Checking your KYC status...
            </div>
          ) : (
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Current status: <span className="capitalize text-cyan-300">{kycStatus.replace('_', ' ')}</span></p>
              {kycStatus === 'approved' && <p className="mt-1 text-xs text-green-300">Your identity is already verified.</p>}
              {kycStatus === 'pending' && <p className="mt-1 text-xs text-amber-300">Your documents are under review.</p>}
              {kycStatus === 'rejected' && <p className="mt-1 text-xs text-red-300">Reason: {rejectionReason || 'Please resubmit clearer documents.'}</p>}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {([
              { key: 'nicFront', label: 'NIC Front' },
              { key: 'nicBack', label: 'NIC Back' },
              { key: 'selfie', label: 'Selfie with NIC' },
            ] as const).map((item) => (
              <label key={item.key} className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200 hover:border-cyan-400/40">
                <span className="font-medium text-white">{item.label}</span>
                <span className="text-xs text-gray-400">{files[item.key] ? files[item.key]!.name : 'Choose file'}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-xs text-cyan-300">
                  <Upload size={14} /> Upload file
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(item.key, e.target.files?.[0] || null)}
                />
              </label>
            ))}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-200">
              <CheckCircle size={16} /> {success}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              Submit KYC
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10"
            >
              Skip for now <SkipForward size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/owner/dashboard', { replace: true })}
            className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
          >
            Continue to dashboard <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
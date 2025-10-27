import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Download, Trash2, Calendar, Mail, Phone, Building2, User, ExternalLink, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Submission {
  type: string;
  timestamp: string;
  [key: string]: any;
}

export function SubmissionsViewer() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const saved = localStorage.getItem('form_submissions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSubmissions(parsed.sort((a: Submission, b: Submission) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }
  };

  const deleteSubmission = (index: number) => {
    if (confirm('Weet je zeker dat je deze submission wilt verwijderen?')) {
      const updated = submissions.filter((_, i) => i !== index);
      setSubmissions(updated);
      localStorage.setItem('form_submissions', JSON.stringify(updated));
      setSelectedSubmission(null);
      toast.success('Submission verwijderd');
    }
  };

  const deleteAllSubmissions = () => {
    if (confirm('Weet je zeker dat je ALLE submissions wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
      localStorage.removeItem('form_submissions');
      setSubmissions([]);
      setSelectedSubmission(null);
      toast.success('Alle submissions verwijderd');
    }
  };

  const exportSubmissions = () => {
    const data = JSON.stringify(submissions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Submissions geëxporteerd');
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      toast.error('Geen submissions om te exporteren');
      return;
    }

    // Get all unique keys from all submissions
    const allKeys = new Set<string>();
    submissions.forEach(sub => {
      Object.keys(sub).forEach(key => allKeys.add(key));
    });

    const keys = Array.from(allKeys);
    const csvHeader = keys.join(',');
    const csvRows = submissions.map(sub => 
      keys.map(key => {
        const value = sub[key];
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value || '').replace(/"/g, '""')}"`;
      }).join(',')
    );

    const csv = [csvHeader, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Submissions geëxporteerd als CSV');
  };

  // Get unique submission types
  const submissionTypes = ['all', ...new Set(submissions.map(s => s.type))];

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    const matchesType = filterType === 'all' || sub.type === filterType;
    const matchesSearch = searchTerm === '' || 
      Object.values(sub).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesType && matchesSearch;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'IT-Check': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Modern Workplace Scan': 'bg-sky-100 text-sky-800 border-sky-200',
      'Cloud Readiness Scan': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Security Scan': 'bg-violet-100 text-violet-800 border-violet-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderFieldValue = (key: string, value: any) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">Niet ingevuld</span>;
    }

    if (typeof value === 'boolean') {
      return <Badge variant={value ? 'default' : 'secondary'}>{value ? 'Ja' : 'Nee'}</Badge>;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-1 text-sm">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <span className="font-medium">{k}:</span> {String(v)}
            </div>
          ))}
        </div>
      );
    }

    if (key === 'email') {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline flex items-center gap-1">
          <Mail className="w-3 h-3" />
          {value}
        </a>
      );
    }

    if (key === 'phone') {
      return (
        <a href={`tel:${value}`} className="text-blue-600 hover:underline flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {value}
        </a>
      );
    }

    if (key === 'website') {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          {value}
        </a>
      );
    }

    return String(value);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-2">Form Submissions</h2>
          <p className="text-gray-600">
            Bekijk en beheer alle formulier inzendingen ({submissions.length} totaal)
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={exportSubmissions} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          {submissions.length > 0 && (
            <Button onClick={deleteAllSubmissions} variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Verwijder alles
            </Button>
          )}
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <div className="text-6xl mb-4">📬</div>
          <h3 className="text-xl mb-2">Nog geen submissions</h3>
          <p className="text-gray-600">
            Formulier inzendingen verschijnen hier automatisch wanneer gebruikers een formulier invullen.
          </p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Zoek in submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Filter op type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {submissionTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'Alle types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 px-2">
              {filteredSubmissions.length} van {submissions.length} submissions
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredSubmissions.map((submission, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSubmission === submission
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getTypeColor(submission.type)}>
                      {submission.type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(submission.timestamp)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {submission.name && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="truncate">{submission.name || submission.contactPerson}</span>
                      </div>
                    )}
                    {(submission.company || submission.companyName) && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="w-3 h-3 text-gray-400" />
                        <span className="truncate">{submission.company || submission.companyName}</span>
                      </div>
                    )}
                    {submission.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="truncate">{submission.email}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submission Detail */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge className={`${getTypeColor(selectedSubmission.type)} mb-2`}>
                      {selectedSubmission.type}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedSubmission.timestamp)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const index = submissions.indexOf(selectedSubmission);
                      deleteSubmission(index);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Verwijderen
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      Contactgegevens
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(selectedSubmission)
                        .filter(([key]) => ['name', 'contactPerson', 'company', 'companyName', 'email', 'phone', 'website'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <Label className="text-xs text-gray-500 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                            <div className="p-2 bg-gray-50 rounded border">
                              {renderFieldValue(key, value)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Scan Answers (if applicable) */}
                  {selectedSubmission.answers && Object.keys(selectedSubmission.answers).length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">Scan Antwoorden</h3>
                      <div className="space-y-3">
                        {Object.entries(selectedSubmission.answers).map(([key, value]) => (
                          <div key={key} className="p-3 bg-gray-50 rounded border">
                            <div className="text-xs text-gray-500 mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div>{renderFieldValue(key, value)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Other Fields */}
                  <div>
                    <h3 className="text-lg mb-3">Overige Informatie</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedSubmission)
                        .filter(([key]) => !['type', 'timestamp', 'captchaVerified', 'answers', 'name', 'contactPerson', 'company', 'companyName', 'email', 'phone', 'website'].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="p-3 bg-gray-50 rounded border">
                            <div className="text-xs text-gray-500 mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div>{renderFieldValue(key, value)}</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Raw JSON */}
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                      Bekijk ruwe JSON data
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-900 text-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedSubmission, null, 2)}
                    </pre>
                  </details>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center border-dashed">
                <p className="text-gray-500">Selecteer een submission om details te bekijken</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

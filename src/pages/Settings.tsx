import { useTheme, Theme } from '@/hooks/use-theme';
import { useFontSize, FontSize } from '@/hooks/use-font-size';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Settings() {
  const [theme, setTheme] = useTheme();
  const [fontSize, setFontSize] = useFontSize();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sepia" id="sepia" />
                <Label htmlFor="sepia">Sepia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teal" id="teal" />
                <Label htmlFor="teal">Teal</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <RadioGroup
              value={fontSize}
              onValueChange={(value) => setFontSize(value as FontSize)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

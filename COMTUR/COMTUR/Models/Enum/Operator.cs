using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;

namespace COMTUR.Models.Enum
{
	public static class Operator
	{
		public static string RemoveDiacritics(this string text)
		{
			if (string.IsNullOrWhiteSpace(text))
				return text;

			var normalizedString = text.Normalize(NormalizationForm.FormD);
			var stringBuilder = new System.Text.StringBuilder();

			foreach (var c in normalizedString)
			{
				var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
				if (unicodeCategory != UnicodeCategory.NonSpacingMark)
				{
					stringBuilder.Append(c);
				}
			}

			return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
		}

		public static string ExtractNumbers(this string text)
		{
			if (string.IsNullOrEmpty(text))
				return string.Empty;

			return new string(text.Where(char.IsDigit).ToArray());
		}

		public static bool CompareString(string str1, string str2)
		{
			return string.Equals(str1.RemoveDiacritics(), str2.RemoveDiacritics(), StringComparison.OrdinalIgnoreCase);
		}

		public static bool IsNumbers(this string text)
		{
			return !string.IsNullOrEmpty(text) && Regex.IsMatch(text, @"^\d+$");
		}
	}
}
"""
Vibe Flow Coding -- Lead Magnet PDF Generator
=============================================
Generates: "10 Easy Automations That Will Transform Your Business"

Requirements:
    pip install fpdf2

Usage:
    python scripts/generate_lead_magnet.py          # Both EN + ES
    python scripts/generate_lead_magnet.py en       # English only
    python scripts/generate_lead_magnet.py es       # Spanish only

Output:
    public/VibeFlow_Automation_Guide_EN.pdf
    public/VibeFlow_Automation_Guide_ES.pdf
"""

import os
import sys
from fpdf import FPDF

# -- Brand Tokens -------------------------------------------------------
NAVY       = (5, 10, 15)
NAVY_LIGHT = (10, 17, 24)
GOLD       = (197, 160, 89)
WHITE      = (255, 255, 255)
SLATE_300  = (203, 213, 225)
SLATE_400  = (148, 163, 184)
SLATE_500  = (100, 116, 139)

PAGE_W = 210
PAGE_H = 297
MARGIN = 20


# ========================================================================
# TRANSLATIONS
# ========================================================================
COPY = {
    "en": {
        "brand": "V I B E   F L O W   C O D I N G",
        "cover_title": "10 EASY\nAUTOMATIONS\nTHAT WILL\nTRANSFORM\nYOUR BUSINESS",
        "cover_sub": "A Free Guide for Business Owners & Restaurant Operators",
        "cover_tagline": "Save Time.  Cut Costs.  Grow Revenue.",
        "cover_tagline2": "Starting Today.",
        "intro_title": "Why Automation Matters Now",
        "intro_body": (
            "If you feel like there aren't enough hours in the day, you are not alone. "
            "But here is the truth: over 60% of daily business tasks can be automated -- "
            "saving you 10 to 20+ hours every single week.\n\n"
            "That is time you could spend growing your business, training your team, "
            "or actually taking a day off."
        ),
        "intro_callout": (
            "We chose these 10 automations for ONE reason:\n"
            "They are EASY to set up and deliver MASSIVE results fast."
        ),
        "who_title": "Who Is This For?",
        "audiences": [
            ("Small Business Owners", "tired of manual data entry and repetitive tasks"),
            ("Restaurant Operators", "dealing with thin margins and high labor costs"),
            ("Entrepreneurs", "who want to scale faster without hiring more people"),
        ],
        "biz_title": "Top 5 Business Automations",
        "biz_sub": "Implement This Week -- No Coding Required",
        "biz": [
            (
                "AI Chatbot for Customer Service",
                "An AI-powered chatbot answers customer questions 24/7, handles FAQs, "
                "and routes complex issues to your team automatically.",
                "Significant reduction in support costs. Customers get instant answers."
            ),
            (
                "Automated Email Marketing Sequences",
                "Sends personalized email sequences triggered by customer actions -- "
                "sign-ups, purchases, abandoned carts -- without lifting a finger.",
                "Higher conversions. Nurtures leads on complete autopilot."
            ),
            (
                "Workflow Automation (Connect Apps)",
                "Automatically moves data between apps. New form -> CRM update -> "
                "Slack notification -> follow-up email. Zero coding.",
                "Saves 10+ hours/week. Eliminates copy-paste."
            ),
            (
                "Automated Invoicing & Payment Reminders",
                "Automatically generates invoices, sends payment reminders on schedule, "
                "and reconciles transactions -- you get paid on time, every time.",
                "Reduces late payments significantly. No manual bookkeeping."
            ),
            (
                "Automated Appointment & Booking",
                "Customers book online, receive automatic confirmations and reminders. "
                "Syncs with your calendar. No more phone tag or double-bookings.",
                "Major reduction in no-shows. Hours of admin freed."
            ),
        ],
        "biz_callout": (
            "\"The businesses that win are not the ones with the most employees.\n"
            "They are the ones that automate the most.\""
        ),
        "rest_title": "Top 5 Restaurant Automations",
        "rest_sub": "Designed for Your Industry",
        "rest_note": "(What we specialize on!!)",
        "rest": [
            (
                "Self-Ordering QR Code Menus",
                "Customers scan a QR code at the table, browse the menu, and place "
                "orders from their phone. Built-in upselling suggests add-ons.",
                "Higher average ticket. Faster table turnover."
            ),
            (
                "Smart Inventory Management",
                "Tracks stock in real-time, alerts when supplies run low, and "
                "predicts how much you need based on sales history and trends.",
                "Significant waste reduction. No stock-outs."
            ),
            (
                "Automated Staff Scheduling",
                "Creates optimized schedules based on demand, availability, and "
                "labor laws. Staff swap shifts from their phone. No spreadsheets.",
                "Cuts scheduling time drastically. Lower labor costs."
            ),
            (
                "Loyalty & Rewards Program",
                "Auto-enrolls customers, tracks visits and spending, and sends "
                "personalized rewards. Turns one-time visitors into regulars.",
                "Higher repeat visits. Greater customer lifetime value."
            ),
            (
                "Reservations & Waitlist Management",
                "Customers book tables online 24/7, receive SMS confirmation and "
                "reminders. Smart waitlist sends real-time updates.",
                "Maximizes seating. Fewer no-shows. Better experience."
            ),
        ],
        "rest_callout": (
            "\"Your competitors are not waiting. Restaurants adopting AI and\n"
            "automation today are already serving more customers with fewer staff.\""
        ),
        "steps_title": "Ready to Automate? 3 Simple Steps",
        "steps": [
            ("Book a Free Strategy Call",
             "Schedule a no-obligation 15-minute call with our team. We will "
             "analyze your current operations and identify your biggest wins."),
            ("Get Your Custom Automation Plan",
             "We build a tailored roadmap with the exact automations your "
             "business needs -- prioritized by impact and ROI."),
            ("Launch & Scale",
             "Our engineers implement everything for you. You start seeing "
             "results in days, not months. Zero disruption to your operations."),
        ],
        "steps_callout": (
            "Ready to stop doing everything manually?\n"
            "Book your free strategy call today."
        ),
        "cta_heading": "Want Expert Help\nSetting These Up?",
        "cta_body": (
            "At Vibe Flow Coding, we don't just recommend automations -- "
            "we build them for you. Our team of senior engineers with 10+ years "
            "of enterprise experience designs custom AI agents and automation "
            "solutions tailored to your business."
        ),
        "services": [
            "Custom AI Chatbots & WhatsApp Ordering",
            "Automated Workflow Design & Integration",
            "AI-Powered Dashboards & Analytics",
            "Digital Menu & QR Code Systems",
        ],
        "cta_button": "Book Your Free Consultation",
        "impact_label": "IMPACT",
        "footer_site": "vibeflowcoding.com",
    },

    "es": {
        "brand": "V I B E   F L O W   C O D I N G",
        "cover_title": "10\nAUTOMATIZACIONES\nFACILES QUE\nTRANSFORMARAN\nSU NEGOCIO",
        "cover_sub": "Guia Gratuita para Empresarios y Restaurantes",
        "cover_tagline": "Ahorre Tiempo.  Reduzca Costos.  Crezca.",
        "cover_tagline2": "Empezando Hoy.",
        "intro_title": "Por Que Automatizar Ahora?",
        "intro_body": (
            "Si siente que no hay suficientes horas en el dia, no esta solo. "
            "La verdad es que mas del 60% de las tareas diarias de un negocio "
            "pueden automatizarse -- ahorrando de 10 a 20+ horas cada semana.\n\n"
            "Ese es tiempo que podria dedicar a crecer su negocio, capacitar a "
            "su equipo, o simplemente tomarse un dia libre."
        ),
        "intro_callout": (
            "Elegimos estas 10 automatizaciones por UNA razon:\n"
            "Son FACILES de implementar y entregan RESULTADOS MASIVOS rapido."
        ),
        "who_title": "Para Quien Es Esta Guia?",
        "audiences": [
            ("Duenos de Negocios", "cansados de tareas manuales y repetitivas"),
            ("Operadores de Restaurantes", "lidiando con margenes delgados y altos costos"),
            ("Emprendedores", "que quieren escalar sin contratar mas personal"),
        ],
        "biz_title": "Top 5 Automatizaciones de Negocio",
        "biz_sub": "Implemente Esta Semana -- Sin Codigo",
        "biz": [
            (
                "Chatbot IA para Atencion al Cliente",
                "Un chatbot con IA responde preguntas de clientes 24/7, maneja "
                "preguntas frecuentes y enruta problemas complejos automaticamente.",
                "Reduccion significativa en costos de soporte. Respuestas instantaneas."
            ),
            (
                "Secuencias de Email Marketing Automatizadas",
                "Envia secuencias de email personalizadas activadas por acciones del "
                "cliente -- registros, compras, carritos abandonados -- sin esfuerzo.",
                "Mayores conversiones. Nutre prospectos en piloto automatico."
            ),
            (
                "Automatizacion de Flujos (Conectar Apps)",
                "Mueve datos automaticamente entre apps. Nuevo formulario -> CRM -> "
                "notificacion Slack -> email de seguimiento. Sin codigo.",
                "Ahorra 10+ horas/semana. Elimina copiar y pegar."
            ),
            (
                "Facturacion y Recordatorios de Pago",
                "Genera facturas automaticamente, envia recordatorios de pago y "
                "concilia transacciones -- le pagan a tiempo, siempre.",
                "Reduce pagos atrasados significativamente. Sin contabilidad manual."
            ),
            (
                "Citas y Reservaciones Automatizadas",
                "Los clientes reservan en linea, reciben confirmaciones y recordatorios "
                "automaticos. Se sincroniza con su calendario.",
                "Gran reduccion de ausencias. Horas de administracion liberadas."
            ),
        ],
        "biz_callout": (
            "\"Los negocios ganadores no son los que tienen mas empleados.\n"
            "Son los que mas automatizan.\""
        ),
        "rest_title": "Top 5 Automatizaciones para Restaurantes",
        "rest_sub": "Disenadas para Su Industria",
        "rest_note": "(En lo que nos especializamos!!)",
        "rest": [
            (
                "Menus QR con Pedido Automatico",
                "Los clientes escanean un codigo QR en la mesa, ven el menu y "
                "hacen su pedido desde el telefono. Incluye sugerencias de ventas.",
                "Mayor ticket promedio. Rotacion de mesas mas rapida."
            ),
            (
                "Gestion de Inventario Inteligente",
                "Rastrea existencias en tiempo real, alerta cuando hay poco stock "
                "y predice cuanto necesita basandose en el historial de ventas.",
                "Reduccion significativa de desperdicio. Sin faltantes."
            ),
            (
                "Programacion Automatica de Personal",
                "Crea horarios optimizados segun demanda, disponibilidad y leyes "
                "laborales. El personal intercambia turnos desde su celular.",
                "Reduce drasticamente el tiempo de programacion. Menores costos."
            ),
            (
                "Programa de Lealtad y Recompensas",
                "Inscribe clientes automaticamente, rastrea visitas y gastos, "
                "y envia recompensas personalizadas. Convierte visitantes en clientes fieles.",
                "Mas visitas recurrentes. Mayor valor de por vida del cliente."
            ),
            (
                "Reservaciones y Lista de Espera",
                "Los clientes reservan mesa en linea 24/7, reciben confirmacion "
                "por SMS y recordatorios. Lista de espera inteligente en tiempo real.",
                "Maximiza la ocupacion. Menos ausencias. Mejor experiencia."
            ),
        ],
        "rest_callout": (
            "\"Su competencia no esta esperando. Los restaurantes que adoptan IA\n"
            "y automatizacion hoy ya atienden mas clientes con menos personal.\""
        ),
        "steps_title": "Listo para Automatizar? 3 Pasos Simples",
        "steps": [
            ("Agende una Llamada Gratis",
             "Reserve una llamada de 15 minutos sin compromiso con nuestro equipo. "
             "Analizaremos sus operaciones e identificaremos sus mayores oportunidades."),
            ("Reciba Su Plan Personalizado",
             "Creamos una hoja de ruta a la medida con las automatizaciones exactas "
             "que su negocio necesita -- priorizadas por impacto y retorno."),
            ("Lance y Escale",
             "Nuestros ingenieros implementan todo por usted. Usted empieza a ver "
             "resultados en dias, no meses. Cero interrupcion en sus operaciones."),
        ],
        "steps_callout": (
            "Listo para dejar de hacer todo manualmente?\n"
            "Agende su llamada estrategica hoy."
        ),
        "cta_heading": "Quiere Ayuda Experta\nPara Implementar Esto?",
        "cta_body": (
            "En Vibe Flow Coding, no solo recomendamos automatizaciones -- "
            "las construimos para usted. Nuestro equipo de ingenieros senior con "
            "mas de 10 anos de experiencia empresarial disena agentes de IA y "
            "soluciones de automatizacion a la medida de su negocio."
        ),
        "services": [
            "Chatbots IA & Pedidos por WhatsApp",
            "Diseno de Flujos Automatizados & Integracion",
            "Dashboards con IA & Analitica",
            "Menu Digital & Sistemas de Codigo QR",
        ],
        "cta_button": "Agende Su Consulta Gratis",
        "impact_label": "IMPACTO",
        "footer_site": "vibeflowcoding.com",
    },
}


class VFCGuide(FPDF):
    """Custom PDF class with brand-consistent helpers."""

    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=20)

    def _bg(self, color=NAVY):
        self.set_fill_color(*color)
        self.rect(0, 0, PAGE_W, PAGE_H, "F")

    def _gold_line(self, y, w=50):
        self.set_fill_color(*GOLD)
        x = (PAGE_W - w) / 2
        self.rect(x, y, w, 1.2, "F")

    def _corner_accent(self):
        self.set_fill_color(*GOLD)
        self.set_draw_color(*GOLD)
        self.rect(PAGE_W - 35, 15, 20, 1, "F")
        self.rect(PAGE_W - 16, 15, 1, 20, "F")
        self.rect(15, PAGE_H - 16, 20, 1, "F")
        self.rect(15, PAGE_H - 35, 1, 20, "F")

    def section_title(self, title, subtitle="", y_start=None):
        if y_start:
            self.set_y(y_start)
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(*WHITE)
        self.cell(0, 12, title, 0, 1, "C")
        self._gold_line(self.get_y() + 3)
        self.ln(8)
        if subtitle:
            self.set_font("Helvetica", "", 11)
            self.set_text_color(*SLATE_400)
            self.cell(0, 8, subtitle, 0, 1, "C")
            self.ln(6)

    def body_text(self, text, align="L"):
        self.set_font("Helvetica", "", 11)
        self.set_text_color(*SLATE_300)
        self.multi_cell(0, 7, text, 0, align)
        self.ln(3)

    def automation_card(self, number, title, desc, impact, impact_label="IMPACT"):
        y_top = self.get_y()
        card_h = 48
        self.set_fill_color(*NAVY_LIGHT)
        self.set_draw_color(GOLD[0], GOLD[1], GOLD[2])
        self.rect(MARGIN, y_top, PAGE_W - 2 * MARGIN, card_h, "F")

        self.set_fill_color(*GOLD)
        self.rect(MARGIN, y_top, 3, card_h, "F")

        self.set_xy(MARGIN + 8, y_top + 3)
        self.set_font("Helvetica", "B", 20)
        self.set_text_color(*GOLD)
        self.cell(12, 10, f"{number:02d}", 0, 0)

        self.set_xy(MARGIN + 22, y_top + 4)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*WHITE)
        self.cell(0, 8, title)

        self.set_xy(MARGIN + 8, y_top + 15)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(*SLATE_300)
        self.multi_cell(PAGE_W - 2 * MARGIN - 16, 5, desc, 0, "L")

        self.set_xy(MARGIN + 8, y_top + 32)
        self.set_font("Helvetica", "B", 7)
        self.set_text_color(*GOLD)
        self.cell(0, 5, impact_label, 0, 2)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*SLATE_400)
        self.cell(0, 4, impact, 0, 0)

        self.set_y(y_top + card_h + 5)

    def callout_box(self, text, accent_color=GOLD):
        y = self.get_y()
        box_w = PAGE_W - 2 * MARGIN
        self.set_fill_color(accent_color[0], accent_color[1], accent_color[2])
        self.rect(MARGIN, y, box_w, 1.5, "F")
        self.set_fill_color(accent_color[0] // 4, accent_color[1] // 4, accent_color[2] // 4)
        self.rect(MARGIN, y + 1.5, box_w, 35, "F")
        self.set_xy(MARGIN + 8, y + 6)
        self.set_font("Helvetica", "BI", 11)
        self.set_text_color(*WHITE)
        self.multi_cell(box_w - 16, 7, text, 0, "C")
        self.set_y(y + 42)

    def step_item(self, number, title, desc):
        y = self.get_y()
        self.set_fill_color(*GOLD)
        cx = MARGIN + 10
        cy = y + 5
        self.ellipse(cx - 5, cy - 5, 10, 10, "F")
        self.set_xy(cx - 5, cy - 4)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*NAVY)
        self.cell(10, 8, str(number), 0, 0, "C")

        self.set_xy(MARGIN + 22, y)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(*WHITE)
        self.cell(0, 10, title)

        self.set_xy(MARGIN + 22, y + 11)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*SLATE_400)
        self.multi_cell(PAGE_W - MARGIN * 2 - 30, 6, desc, 0, "L")
        self.ln(5)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 7)
        self.set_text_color(*SLATE_500)
        self.cell(0, 10, "vibeflowcoding.com", 0, 0, "L")
        self.cell(0, 10, f"{self.page_no()}", 0, 0, "R")


def build_guide(lang="en"):
    t = COPY[lang]
    pdf = VFCGuide()

    # PAGE 1 -- COVER
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.set_y(70)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 8, t["brand"], 0, 1, "C")
    pdf._gold_line(pdf.get_y() + 5, w=60)

    pdf.set_y(95)
    pdf.set_font("Helvetica", "B", 34)
    pdf.set_text_color(*WHITE)
    pdf.multi_cell(0, 16, t["cover_title"], 0, "C")

    pdf.ln(10)
    pdf.set_font("Helvetica", "", 13)
    pdf.set_text_color(*SLATE_400)
    pdf.cell(0, 8, t["cover_sub"], 0, 1, "C")

    pdf.set_y(PAGE_H - 45)
    pdf.set_fill_color(*GOLD)
    pdf.rect(MARGIN, pdf.get_y(), PAGE_W - 2 * MARGIN, 0.8, "F")
    pdf.ln(8)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 8, t["cover_tagline"], 0, 1, "C")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*SLATE_500)
    pdf.cell(0, 6, t["cover_tagline2"], 0, 1, "C")

    # PAGE 2 -- INTRODUCTION
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.section_title(t["intro_title"], y_start=30)
    pdf.set_x(MARGIN)
    pdf.body_text(t["intro_body"])
    pdf.ln(3)
    pdf.callout_box(t["intro_callout"])

    pdf.ln(5)
    pdf.set_x(MARGIN)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 10, t["who_title"], 0, 1)
    pdf.ln(2)

    for title, desc in t["audiences"]:
        pdf.set_x(MARGIN + 5)
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*GOLD)
        pdf.cell(4, 7, ">", 0, 0)
        pdf.set_text_color(*WHITE)
        pdf.cell(55, 7, f"  {title} ", 0, 0)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*SLATE_400)
        pdf.cell(0, 7, f"- {desc}", 0, 1)
        pdf.ln(2)

    # PAGE 3 -- BUSINESS AUTOMATIONS (1-3)
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.section_title(t["biz_title"], t["biz_sub"], y_start=25)
    for i in range(3):
        pdf.automation_card(i + 1, *t["biz"][i], impact_label=t["impact_label"])

    # PAGE 4 -- BUSINESS AUTOMATIONS (4-5)
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()
    pdf.set_y(25)
    for i in range(3, 5):
        pdf.automation_card(i + 1, *t["biz"][i], impact_label=t["impact_label"])
    pdf.ln(8)
    pdf.callout_box(t["biz_callout"])

    # PAGE 5 -- RESTAURANT AUTOMATIONS (1-3)
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.section_title(t["rest_title"], t["rest_sub"], y_start=25)

    # Specialization note
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 8, t["rest_note"], 0, 1, "C")
    pdf.ln(4)

    for i in range(3):
        pdf.automation_card(i + 1, *t["rest"][i], impact_label=t["impact_label"])

    # PAGE 6 -- RESTAURANT AUTOMATIONS (4-5)
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()
    pdf.set_y(25)
    for i in range(3, 5):
        pdf.automation_card(i + 1, *t["rest"][i], impact_label=t["impact_label"])
    pdf.ln(8)
    pdf.callout_box(t["rest_callout"])

    # PAGE 7 -- ACTION PLAN (Sales Funnel)
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.section_title(t["steps_title"], y_start=35)
    for i, (title, desc) in enumerate(t["steps"], 1):
        pdf.step_item(i, title, desc)
    pdf.ln(15)
    pdf.callout_box(t["steps_callout"])

    # PAGE 8 -- CTA / ABOUT
    pdf.add_page()
    pdf._bg()
    pdf._corner_accent()

    pdf.set_y(45)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 8, t["brand"], 0, 1, "C")
    pdf.ln(8)

    pdf.set_font("Helvetica", "B", 26)
    pdf.set_text_color(*WHITE)
    pdf.multi_cell(0, 12, t["cta_heading"], 0, "C")

    pdf.ln(5)
    pdf._gold_line(pdf.get_y(), w=40)
    pdf.ln(10)

    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SLATE_300)
    pdf.multi_cell(0, 7, t["cta_body"], 0, "C")
    pdf.ln(10)

    for svc in t["services"]:
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*GOLD)
        pdf.cell(0, 8, f"  *  {svc}", 0, 1, "C")

    pdf.ln(10)

    # CTA Box
    y = pdf.get_y()
    box_w = PAGE_W - 2 * MARGIN
    pdf.set_fill_color(*GOLD)
    pdf.rect(MARGIN, y, box_w, 45, "F")

    pdf.set_xy(MARGIN, y + 8)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.cell(box_w, 10, t["cta_button"], 0, 1, "C")

    pdf.set_x(MARGIN)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(box_w, 7, "vibeflowcoding@gmail.com  |  +506 7126 6775", 0, 1, "C")
    pdf.set_x(MARGIN)
    pdf.cell(box_w, 7, "wa.me/50671266775  |  vibeflowcoding.com", 0, 1, "C")

    # -- Output -----------------------------------------------------------
    os.makedirs("public", exist_ok=True)
    output_path = f"public/VibeFlow_Automation_Guide_{lang.upper()}.pdf"
    pdf.output(output_path)
    print(f"  [{lang.upper()}] Generated: {output_path} ({pdf.page_no()} pages)")
    return output_path


if __name__ == "__main__":
    langs = sys.argv[1:] if len(sys.argv) > 1 else ["en", "es"]
    print()
    for lang in langs:
        if lang in COPY:
            build_guide(lang)
        else:
            print(f"  [WARN] Unknown language: {lang}")
    print()
